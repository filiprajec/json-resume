import { createGlobalStyle } from "styled-components";

import { useResume } from "@/context";

const GlobalPrintStyleComponent = createGlobalStyle<{ pages?: number }>`
  @media print {
    @page { 
      margin: 0; 
    }
    
    html,
    body {
      margin: 0;
      box-shadow: none;
      width: 21cm;
      height: ${(props) => (props.pages ?? 1) * 29.7}cm;
      overflow: hidden;
      background: var(--mantine-color-white);
    }

    * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    }

    .non-printable {
      display: none;
    }
  
    #header-root {
      display: none;
    }
    #main-root {
      padding-top: 0;
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
    #main-root-flex > div:first-child {
      display: none;
    }
  }
`;

export const GlobalPrintStyle = () => {
  const { resumeConfig } = useResume();

  return <GlobalPrintStyleComponent pages={resumeConfig.pageCount} />;
};
