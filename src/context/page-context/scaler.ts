import { logger } from "@/lib/logger";
import { BreakableDistributor } from "./breakable-distributor";
import { ResumePage } from "./resume-page";

interface ScalerInterface {
  readonly scale: number;
  accuracyLevel: AccuracyLevel;
  calculate: (
    pageRef: React.RefObject<HTMLDivElement>,
    contentRef: React.RefObject<HTMLDivElement>,
    numberOfPages: number
  ) => void;
  isCalculating: () => boolean;
}

export type AccuracyLevel = "low" | "mid" | "high";

export type AccuracyConfig = {
  stopping: number;
  decreasePerRender: number;
  rendersBeforeDecrease: number;
};

const accuracyConfigs: Record<AccuracyLevel, AccuracyConfig> = {
  low: {
    stopping: 0.2,
    decreasePerRender: 1.1,
    rendersBeforeDecrease: 2,
  },
  mid: {
    stopping: 0.01,
    decreasePerRender: 1.01,
    rendersBeforeDecrease: 10,
  },
  high: {
    stopping: 0.001,
    decreasePerRender: 1.001,
    rendersBeforeDecrease: 10,
  },
};

export class Scaler implements ScalerInterface {
  private _scale: number = 1;
  private onChange: (scale: number) => void;
  private onStart: () => void;
  private onEnd: (scale: number) => void;
  private breakableDistributors: BreakableDistributor[];
  private page: ResumePage;
  private SKIP_CALCULATION = false;
  private renderCount = 0;
  private calculating = false;
  private accuracy: AccuracyConfig = accuracyConfigs.low;
  private accuracyLevel_: AccuracyLevel = "low";

  constructor(
    page: ResumePage,
    breakableDistributors: BreakableDistributor[],
    options?: {
      onStart: () => void;
      onChange: (scale: number) => void;
      onEnd: (scale: number) => void;
    }
  ) {
    this.page = page;
    this.onChange = options?.onChange ?? (() => {});
    this.onStart = options?.onStart ?? (() => {});
    this.onEnd = options?.onEnd ?? (() => {});
    this.breakableDistributors = breakableDistributors;
  }

  private decreaseAccuracy() {
    const accuracyDecreaseFactor =
      this.accuracy.decreasePerRender **
      (this.renderCount - this.accuracy.rendersBeforeDecrease);

    this.accuracy.stopping = this.accuracy.stopping * accuracyDecreaseFactor;
  }

  private resetRenderParameters() {
    this.renderCount = 0;
    this.accuracy.stopping = 0.01;
  }

  public get scale() {
    return this._scale;
  }

  private set scale(value: number) {
    this._scale = value;
    this.onChange(value);
  }

  public get accuracyLevel(): AccuracyLevel {
    return this.accuracyLevel_;
  }

  public set accuracyLevel(level: AccuracyLevel) {
    this.accuracyLevel_ = level;
    this.accuracy = accuracyConfigs[level];
  }

  public isCalculating() {
    return this.calculating;
  }

  public calculate(
    pageRef: React.RefObject<HTMLDivElement>,
    contentRef: React.RefObject<HTMLDivElement>,
    numberOfPages: number
  ) {
    if (this.calculating) {
      logger.warn("Attempted to run scaler while busy. Ignoring.");
      return;
    }

    this.calculating = true;
    this.onStart();
    this.calculatePoint(pageRef, contentRef, numberOfPages);
  }

  private calculatePoint(
    pageRef: React.RefObject<HTMLDivElement>,
    contentRef: React.RefObject<HTMLDivElement>,
    numberOfPages: number
  ) {
    logger.debug("calculating scale", this.scale);
    const distributorResult = this.breakableDistributors.map((distributor) =>
      distributor.distribute(pageRef)
    );

    const finalPageWithGaps = Math.max(
      ...distributorResult.map((gaps) => gaps.lastPageWithBreak)
    );

    const accumulatedGapsOnLastPage = distributorResult
      .filter(
        (distributedGap) =>
          distributedGap.lastPageWithBreak === finalPageWithGaps
      )
      .map((distributedGap) => distributedGap.accumulatedGap);

    // breakable gap should be from the largest element with a gap on the last page
    const breakableGap = Math.max(...accumulatedGapsOnLastPage.flat());

    const outerHeight = pageRef.current?.clientHeight ?? 0;
    const innerHeight =
      (contentRef.current?.clientHeight ?? 0) +
      2 * this.page.marginY +
      breakableGap;

    let ratio = outerHeight / innerHeight;

    let stoppingCondition =
      ratio >= 1 && Math.abs(1 - ratio) < this.accuracy.stopping;

    if (this.SKIP_CALCULATION) {
      ratio = 1;
      stoppingCondition = true;
    }

    if (stoppingCondition) {
      this.resetRenderParameters();
      this.onEnd(this.scale);
      this.calculating = false;
      return;
    }

    this.scale = this.scale * ratio ** 0.5;

    const shouldDecreaseAccuracy =
      this.renderCount > this.accuracy.rendersBeforeDecrease;

    if (shouldDecreaseAccuracy) {
      this.decreaseAccuracy();
    }

    this.renderCount += 1;

    // this is not a stateful approach, so chuck this into the event loop to unblock the rerender
    setTimeout(() => {
      this.calculatePoint(pageRef, contentRef, numberOfPages);
    }, 0);
  }
}
