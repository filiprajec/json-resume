import { MantineProvider } from "@mantine/core";

import { paperTheme } from "@/lib/theme";
import { usePage } from "./page-context";

interface PaperThemeProviderProps {
  children: React.ReactNode;
}

export const PaperThemeProvider = ({ children }: PaperThemeProviderProps) => {
  const { scale } = usePage();

  return (
    <MantineProvider
      theme={paperTheme(scale)}
      getRootElement={() => document.getElementById("theme-root") ?? undefined}
      cssVariablesSelector="#theme-root"
    >
      <div id="theme-root">{children}</div>
    </MantineProvider>
  );
};
