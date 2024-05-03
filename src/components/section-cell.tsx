import { ContentCell, ContentCellStyles } from "./content-cell";
import { Description, DescriptionStyles } from "./description";
import { SectionCellMarker } from "./section-cell-marker";
import { styles as globalStyles } from "../styles";
import { useZoom } from "../context";
import { ResumeSettings } from "../hooks";
import { ColumnLayout } from "./column-layout";
import { Cell } from "./cell";

interface SectionCellProps {
  heading?: string;
  data?: Record<string, any>;
  ratingBarData?: ResumeSettings["ratingBarData"];
  outlined?: boolean;
  innerOutline?: boolean;
  showHeading?: boolean;
  showIcon?: boolean;
  columnLayout?: boolean;
  showMarkers?: boolean;
  styles?: {
    contentCell?: ContentCellStyles;
    description?: DescriptionStyles;
  };
}

export const SectionCell = ({
  heading = "",
  data = {},
  ratingBarData,
  outlined = false,
  innerOutline = false,
  showHeading = true,
  showIcon = true,
  columnLayout = false,
  showMarkers = true,
  styles = {},
}: SectionCellProps) => {
  const { zoom } = useZoom();

  // merge with defaults
  const stylesContentCell = {
    ...styles.contentCell,
    container: {
      padding: globalStyles.padding.px.medium * zoom,
      ...styles.contentCell?.container,
    },
    heading: {
      fontSize: globalStyles.fontSize.px.h3 * zoom,
      ...styles.contentCell?.heading,
    },
  };

  const { subheadings, descriptions, dates, tags, lists, ratings, dataIDs } =
    data;

  return (
    <ContentCell
      heading={heading}
      showHeading={showHeading}
      icon={data.icon}
      showIcon={showIcon}
      // padding={showHeading}
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
