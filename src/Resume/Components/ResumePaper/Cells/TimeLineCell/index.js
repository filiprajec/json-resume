/* 
    index.js (TimeLineCell)
    <> Filip Rajec
*/

import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";

import ZoomContext from "../../../../context/ZoomContext";
import TimeLineMarker from "./TimeLineMarker";
import TimeLineDate from "./TimeLineDate";
import MarkerJoin from "./MarkerJoin";
import { Cell, ColumnLayout } from "../../Layouts";
import { useMarkerCoordinates } from "./hooks";
import Description, {
  stylesPropType as DescriptionStylesPropType,
} from "../Description";
import ContentCell, {
  stylesPropType as ContentCellStylesPropType,
} from "../ContentCell";
import { ratingBarDataPropType } from "../../../../ResumeSection/propTypes";
import Styles from "../../../../shared/styles";

const TimeLineCell = ({
  heading = "",
  data = {},
  ratingBarData = {},
  outlined = false,
  styles = {},
}) => {
  const parentRef = useRef();
  const markerRefs = useRef([]);
  const markerCoordinates = useMarkerCoordinates(parentRef, markerRefs);
  const { zoom } = useContext(ZoomContext);
  const { subheadings, descriptions, dates, tags, lists, ratings, dataIDs } = data;

  // merge with defaults
  const stylesContentCell = {
    ...styles.contentCell,
    container: {
      padding: Styles.padding.px.medium * zoom,
      ...styles.contentCell?.container,
    },
    heading: {
      fontSize: Styles.fontSize.px.h3 * zoom,
      ...styles.contentCell?.heading,
    },
  };

  const markerSizePx = Math.round(10 * zoom);

  return (
    <ContentCell
      heading={heading}
      icon={data.icon}
      outlined={outlined}
      ref={parentRef}
      styles={stylesContentCell}
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
            <Cell fraction={14}>
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
            />
          )}
        </div>
      ))}
    </ContentCell>
  );
};

TimeLineCell.propTypes = {
  heading: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  ratingBarData: ratingBarDataPropType,
  outlined: PropTypes.bool,
  styles: PropTypes.shape({
    contentCell: ContentCellStylesPropType,
    description: DescriptionStylesPropType,
  }),
};

export default TimeLineCell;
