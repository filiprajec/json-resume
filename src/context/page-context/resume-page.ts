interface ResumePageInterface {
  setMarginY: (marginY: number) => void;
  addMarkers: (pageRef: React.RefObject<HTMLDivElement>) => void;
  calculatePageProperties(pageRef: React.RefObject<HTMLDivElement>): {
    count: number;
    height: number;
    breakYs: number[];
    startYs: number[];
    endYs: number[];
  };
  readonly marginY: number;
}

export class ResumePage implements ResumePageInterface {
  public marginY: number;
  private pageMarkers: HTMLDivElement[] = [];
  private numberOfPages: number = 1;

  constructor(numberOfPages: number, marginY: number) {
    this.numberOfPages = numberOfPages;
    this.marginY = marginY;
  }

  public setMarginY(marginY: number) {
    this.marginY = marginY;
  }

  public setNumberOfPages(numberOfPages: number) {
    this.numberOfPages = numberOfPages;
  }

  public calculatePageProperties(pageRef: React.RefObject<HTMLDivElement>) {
    const pageHeight =
      (pageRef.current?.clientHeight ?? 0) / this.numberOfPages;
    const pageBreakYs = Array.from({ length: this.numberOfPages + 1 }, (_, i) =>
      Math.round(i * pageHeight)
    );
    const pageStartYs = pageBreakYs.slice(0, -1).map((y) => y + this.marginY);
    const pageEndYs = pageBreakYs.slice(1).map((y) => y - this.marginY);

    return {
      count: this.numberOfPages,
      height: pageHeight,
      breakYs: pageBreakYs,
      startYs: pageStartYs,
      endYs: pageEndYs,
    };
  }

  private removeMarkers() {
    this.pageMarkers.forEach((marker) => {
      marker.remove();
    });
    this.pageMarkers = [];
  }

  public addMarkers(pageRef: React.RefObject<HTMLDivElement>) {
    this.removeMarkers();
    const properties = this.calculatePageProperties(pageRef);
    const showBufferZones = true;

    properties.breakYs.forEach((y, index) => {
      const pageBreak = document.createElement("div");
      pageBreak.style.position = "absolute";
      pageBreak.style.width = "100%";
      pageBreak.style.height = "1px";
      pageBreak.style.backgroundColor = "var(--mantine-color-red-5)";
      pageBreak.style.top = `${y}px`;
      pageBreak.style.zIndex = "1";
      pageBreak.classList.add("non-printable");
      pageRef.current?.appendChild(pageBreak);
      const pageNumber = document.createElement("div");
      pageNumber.style.position = "absolute";
      pageNumber.style.top = `${y}px`;
      pageNumber.style.left = "0";
      pageNumber.style.backgroundColor = "var(--mantine-color-red-5)";
      pageNumber.style.color = "white";
      pageNumber.style.fontSize = "12px";
      pageNumber.style.zIndex = "1";
      pageNumber.style.padding = "2px 6px";
      pageNumber.textContent = `Page ${index + 1}`;
      pageNumber.classList.add("non-printable");
      pageRef.current?.appendChild(pageNumber);

      this.pageMarkers.push(...[pageBreak, pageNumber]);

      // add the buffer zone
      if (showBufferZones) {
        const bufferZone = document.createElement("div");
        bufferZone.style.position = "absolute";
        bufferZone.style.width = "100%";
        bufferZone.style.height = `${this.marginY}px`;
        bufferZone.style.backgroundColor = "var(--mantine-color-white)";
        bufferZone.style.opacity = "1";
        bufferZone.style.top = `${y - this.marginY}px`;
        pageRef.current?.appendChild(bufferZone);
        const bufferZone2 = document.createElement("div");
        bufferZone2.style.position = "absolute";
        bufferZone2.style.width = "100%";
        bufferZone2.style.height = `${this.marginY}px`;
        bufferZone2.style.backgroundColor = "var(--mantine-color-white)";
        bufferZone2.style.opacity = "1";
        bufferZone2.style.top = `${y}px`;
        pageRef.current?.appendChild(bufferZone2);

        this.pageMarkers.push(...[bufferZone, bufferZone2]);
      }
    });
  }
}
