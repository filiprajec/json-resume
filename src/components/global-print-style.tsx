import { createGlobalStyle } from "styled-components";

const GlobalPrintStyle = createGlobalStyle`
  @media print {
    @page { 
      margin: 0; 
    }
    html,
    body {
      margin: 0;
      box-shadow: none;
      width: 21cm;
      height: 29.5cm;
      overflow: hidden;
      background: ${(props: any) => props.background};
    }
    * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    /* color-adjust: exact !important;  */
    }
    #header-root {
      display: none;
    }
    #main-root {
      padding-top: 0;
    }
    #main-root-flex > div:first-child {
      display: none !important;
    }
    #main-root-flex .mantine-ScrollArea-scrollbar {
      display: none !important;
    }
    #main-root-flex .mantine-ScrollArea-root {
      overflow: visible !important;
    }
    #main-root-flex .mantine-ScrollArea-viewport {
      overflow: visible !important;
    }
  }
`;

export const GlobalPrintStyleDom = () => {
  return <GlobalPrintStyle background="var(--mantine-color-white)" />;
};
