import { useRef } from "react";

import { ContentCell, ContentCellStyles } from "./content-cell";
import { Description, DescriptionStyles } from "./description";
import { MarkerJoin } from "./marker-join";
import { TimeLineDate } from "./time-line-date";
import { TimeLineMarker } from "./time-line-marker";
import { useMarkerCoordinates } from "./use-marker-coordinates";
import { useTheme, useZoom } from "../context";
import { RatingBarData, ResumeSectionInstance } from "../types";
import { ColumnLayout } from "./column-layout";
import { Cell } from "./cell";

interface TimeLineCellProps {
  heading?: string;
  data?: ResumeSectionInstance;
  ratingBarData?: RatingBarData;
  outlined?: boolean;
  styles?: {
    contentCell?: ContentCellStyles;
    description?: DescriptionStyles;
  };
  showIcon?: boolean;
}

export const TimeLineCell = ({
  heading = "",
  data,
  ratingBarData = {
    name: "",
    value: 0,
  },
  outlined = false,
  styles = {},
  showIcon = true,
}: TimeLineCellProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerCoordinates = useMarkerCoordinates(parentRef, markerRefs);
  const { zoom } = useZoom();
  const theme = useTheme();
  const stylesContentCell = {
    ...styles.contentCell,
    container: {
      padding: theme.padding.px.md * zoom,
      ...styles.contentCell?.container,
    },
    headingOuter: {
      marginLeft: theme.padding.px.sm * 5 * zoom,
    },
    heading: {
      fontSize: theme.fontSize.px.h3 * zoom,
      ...styles.contentCell?.heading,
    },
  };
  const markerSizePx = Math.round(12 * zoom);

  if (!data) {
    return null;
  }

  const { subheadings, descriptions, dates, tags, lists, ratings, dataIDs } =
    data ?? {};

  return (
    <ContentCell
      heading={heading}
      icon={data.icon}
      outlined={outlined}
      ref={parentRef}
      styles={stylesContentCell}
      headingOffset={5 / 28}
      showIcon={showIcon}
    >
      {subheadings.map((subheading, index) => (
        <div key={`timeline-cell-${dataIDs[index]}`}>
          <ColumnLayout>
            <TimeLineDate date={dates[index]} />
            <TimeLineMarker
              size={markerSizePx}
              ref={(ref) => {
                markerRefs.current[index] = ref;
              }}
            />
            <Cell fraction={23}>
              <Description
                heading={subheading}
                rating={ratings[index]}
                description={descriptions[index]}
                list={lists[index]}
                tags={tags[index]}
                styles={styles.description}
                ratingBarData={ratingBarData}
                ID={dataIDs[index]}
              />
            </Cell>
          </ColumnLayout>
          {markerCoordinates && markerCoordinates.length > 0 && index > 0 && (
            <MarkerJoin
              markerSize={markerSizePx}
              coordinates={{
                first: markerCoordinates[index - 1],
                second: markerCoordinates[index],
              }}
              color={theme.colors.black}
            />
          )}
        </div>
      ))}
    </ContentCell>
  );
};
