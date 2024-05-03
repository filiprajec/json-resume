import { ColumnLayout } from "./column-layout";
import { RowLayout } from "./row-layout";

interface LayoutWrapperProps {
  columnLayout: boolean;
  children: React.ReactNode;
}

export const LayoutWrapper = ({ columnLayout, children }: LayoutWrapperProps) =>
  columnLayout ? (
    <ColumnLayout>{children}</ColumnLayout>
  ) : (
    <RowLayout>{children}</RowLayout>
  );
