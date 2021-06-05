/* 
    index.js (SectionCell)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";

import ContentCell, {
  stylesPropType as ContentCellStylesPropType,
} from "../ContentCell";
import ZoomContext from "../../../../context/ZoomContext";
import Styles from "../../../../shared/styles";
import { Cell, ColumnLayout } from "../../Layouts";
import SectionCellMarker from "./SectionCellMarker";
import Description, {
  stylesPropType as DescriptionStylesPropType,
} from "../Description";
import { ratingBarDataPropType } from "../../../../ResumeSection/propTypes";

const SectionCell = ({
  heading = "",
  data = {},
  ratingBarData = {},
  outlined = false,
  innerOutline = false,
  showHeading = true,
  showIcon = true,
  columnLayout = false,
  showMarkers = true,
  styles = {},
}) => {
  const { zoom } = useContext(ZoomContext);

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

  const { subheadings, descriptions, dates, tags, lists, ratings, dataIDs } = data;

  return (
    <ContentCell
      heading={heading}
      showHeading={showHeading}
      icon={data.icon}
      showIcon={showIcon}
      padding={showHeading}
      outlined={outlined}
      outlinedHeading={innerOutline}
      columnLayout={columnLayout}
      styles={stylesContentCell}
    >
      {subheadings.map((subheading, index) => (
        <ColumnLayout key={`section-cell-${dataIDs[index]}`}>
          {showMarkers && <SectionCellMarker />}
          <Cell fraction={14}>
            <Description
              heading={subheading}
              date={dates[index]}
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
      ))}
    </ContentCell>
  );
};

SectionCell.propTypes = {
  heading: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  ratingBarData: ratingBarDataPropType,
  outlined: PropTypes.bool,
  innerOutline: PropTypes.bool,
  columnLayout: PropTypes.bool,
  showHeading: PropTypes.bool,
  showIcon: PropTypes.bool,
  showMarkers: PropTypes.bool,
  styles: PropTypes.shape({
    contentCell: ContentCellStylesPropType,
    description: DescriptionStylesPropType,
  }),
};

export default SectionCell;
