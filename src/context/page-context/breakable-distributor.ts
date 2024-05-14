import { ResumePage } from "./resume-page";
import { notEmpty } from "@/lib/utils";

export type BreakableSetOptions = {
  page: number;
  top: number;
  bottom: number;
  left: number;
  hasBreakBelow: boolean;
  distanceToBreakBelow: number;
};

export type BreakableOptions = {
  active: boolean;
  set: (breakableOptions: Partial<BreakableSetOptions>) => void;
};

export type BreakableItem = {
  ref: HTMLDivElement;
  options: BreakableOptions;
};

interface BreakableDistributorInterface {
  setBreakables: (breakable: BreakableItem[]) => void;
  resetBreakables: () => void;
  distribute: (pageRef: React.RefObject<HTMLDivElement>) => {
    gaps: number[];
    accumulatedGap: number;
    lastPageWithBreak: number;
  };
}

export class BreakableDistributor implements BreakableDistributorInterface {
  private breakables: {
    ref: HTMLDivElement;
    options: BreakableOptions;
  }[] = [];
  private page: ResumePage;

  constructor(resumePage: ResumePage) {
    this.page = resumePage;
  }

  public setBreakables(breakables: BreakableItem[]) {
    this.breakables = breakables;
  }

  public resetBreakables() {
    this.breakables.forEach((ref) => {
      ref.options.set({
        bottom: 0,
        hasBreakBelow: false,
        page: 0,
        top: 0,
        left: 0,
        distanceToBreakBelow: 0,
      });
    });
  }

  private calculateBreakableDistances(
    currentPageBreakPadding: number = 0,
    pageRef: React.RefObject<HTMLDivElement>
  ) {
    const pageProperties = this.page.calculatePageProperties(pageRef);

    return this.breakables.map((breakable) => {
      const elTop =
        breakable.ref.getBoundingClientRect().top -
        (pageRef.current?.getBoundingClientRect().top ?? 0) +
        currentPageBreakPadding;

      const elBottom =
        breakable.ref.getBoundingClientRect().bottom -
        (pageRef.current?.getBoundingClientRect().top ?? 0) +
        currentPageBreakPadding;

      const elLeft = breakable.ref.getBoundingClientRect().left;

      const pageBreaksBelowElement = pageProperties.breakYs.filter(
        (pageBreakY) => pageBreakY > elBottom
      );

      let closestPageBreakBelowElement = pageBreaksBelowElement.reduce(
        (prevY, currY) =>
          Math.abs(currY - elBottom) < Math.abs(prevY - elBottom)
            ? currY
            : prevY,
        Math.max(...pageProperties.breakYs)
      );

      const closestPageBelowElement = Math.round(
        closestPageBreakBelowElement / pageProperties.height
      );

      const distanceToPageBreakBelow = Math.abs(
        closestPageBreakBelowElement - elBottom
      );

      breakable.options.set({
        page: closestPageBelowElement,
        top: elTop,
        bottom: elBottom,
        left: elLeft,
      });

      return {
        bottom: elBottom,
        closestPageBelowElement,
        closestPageBreakBelowElement,
        distanceToPageBreakBelow,
        intersectsPage: undefined,
        ref: breakable,
        top: elTop,
        left: elLeft,
      };
    });
  }

  public distribute(pageRef: React.RefObject<HTMLDivElement>): {
    gaps: number[];
    accumulatedGap: number;
    lastPageWithBreak: number;
  } {
    let accumulatedBreakableGap = 0;
    let lastPageWithBreak = 0;
    let gaps: number[] = [];
    this.resetBreakables();
    const pageProperties = this.page.calculatePageProperties(pageRef);

    pageProperties.breakYs.forEach((_pageBreakY, pageNumber) => {
      if (pageNumber >= pageProperties.breakYs.length - 1) {
        return;
      }

      const breakablesWithDistances = this.calculateBreakableDistances(
        accumulatedBreakableGap,
        pageRef
      ).filter(notEmpty);

      const currentPageBottom = pageProperties.endYs[pageNumber];
      const currentPageTop = pageProperties.startYs[pageNumber];

      const pageBreakRefsInCurrentPage = breakablesWithDistances?.filter(
        (ref) => ref?.bottom < currentPageBottom && ref?.top > currentPageTop
      );

      if (pageNumber === pageProperties.breakYs.length - 2) {
        if (pageBreakRefsInCurrentPage?.length > 0) {
          lastPageWithBreak = pageNumber;
        }

        return;
      }

      const closestToBottom = pageBreakRefsInCurrentPage?.reduce(
        (prev, curr) => (curr?.bottom > prev?.bottom ? curr : prev),
        pageBreakRefsInCurrentPage[0]
      );

      let breakableGap = 0;

      if (closestToBottom) {
        const distanceToBreakBelow =
          pageProperties.breakYs[pageNumber + 1] - closestToBottom.bottom;

        breakableGap = distanceToBreakBelow + this.page.marginY;

        closestToBottom?.ref.options.set({
          hasBreakBelow: true,
          distanceToBreakBelow: breakableGap,
        });
        lastPageWithBreak = pageNumber;
      }

      gaps.push(breakableGap);
      accumulatedBreakableGap += breakableGap;
    });

    return {
      gaps,
      accumulatedGap: accumulatedBreakableGap,
      lastPageWithBreak,
    };
  }
}
