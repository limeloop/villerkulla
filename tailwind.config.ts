import type { Config } from "tailwindcss";

export default {
  // safelist: [
  //   // Text & Font
  //   { pattern: /text-(gray|white|black)-[0-9]+/ },
  //   { pattern: /text-(sm|base|lg|xl|2xl|3xl)/ },
  //   { pattern: /text-[0-9]+/ },
  //   { pattern: /text-(left|center|right|justify)/ },
  //   { pattern: /font-[a-z]+/ },
  //   { pattern: /font-(thin|extralight|light|normal|medium|semibold|bold)/ },
  
  //   // Backgrounds & Borders
  //   { pattern: /bg-(gray|indigo|white|black)-[0-9]+/ },
  //   { pattern: /border(-[a-z]+)?/ },
  //   { pattern: /outline-none/ },
  
  //   // Spacing
  //   { pattern: /p[trblxy]?-[0-9]+/ },
  //   { pattern: /m[trblxy]?-[0-9]+/ },
  
  //   // Layout & Flex/Grid
  //   { pattern: /grid/ },
  //   { pattern: /gap-[0-9]+/ },
  //   { pattern: /(w|h|max-w)-[a-z0-9/]+/ },
  //   { pattern: /flex(-(row|col|wrap|grow))?/ },
  //   { pattern: /items-(center|start|end|stretch)/ },
  //   { pattern: /justify-(center|between|start|end)/ },
  
  //   // Positioning & Z-index
  //   { pattern: /absolute/ },
  //   { pattern: /relative/ },
  //   { pattern: /fixed/ },
  //   { pattern: /sticky/ },
  //   { pattern: /top-[0-9]+/ },
  //   { pattern: /right-[0-9]+/ },
  //   { pattern: /bottom-[0-9]+/ },
  //   { pattern: /left-[0-9]+/ },
  //   { pattern: /z-[0-9]+/ },
  
  //   // Effects
  //   { pattern: /shadow(-[a-z]+)?/ },
  //   { pattern: /opacity-[0-9]+/ },
  //   { pattern: /transition-(all|colors|opacity)/ },
  //   { pattern: /duration-[0-9]+/ },
  //   { pattern: /ease-(in|out|in-out)/ },
  
  //   // Cursor & Overflow
  //   { pattern: /cursor-(pointer|default|text)/ },
  //   { pattern: /overflow-(hidden|auto|scroll)/ },
  
  //   // Display
  //   { pattern: /hidden/ },
  //   { pattern: /block/ },
  //   { pattern: /inline/ },
  //   { pattern: /inline-block/ },
  
  //   // Tables
  //   { pattern: /table/ },
  //   { pattern: /table-row/ },
  //   { pattern: /table-cell/ },
  //   { pattern: /table-auto/ },
  //   { pattern: /table-fixed/ },
  
  //   // Lists
  //   { pattern: /list-(none|disc|decimal|inside|outside)/ },
  
  //   // Miscellaneous
  //   { pattern: /rounded(-[a-z]+)?/ },
  //   { pattern: /line-clamp-[0-9]+/ },
  //   { pattern: /whitespace-(normal|nowrap|pre|pre-line)/ },
  //   { pattern: /break-(normal|words|all)/ },
  //   { pattern: /object-(contain|cover|fill|none)/ },
  //   { pattern: /hover:(text|bg)-(gray|indigo)-[0-9]+/ },
  // ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
