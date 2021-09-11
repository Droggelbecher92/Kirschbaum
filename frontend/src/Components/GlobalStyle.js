import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root {
    --background-dark: #AEDFDA;
    --background-light: #D7F8FF;
    --accent: darkgrey;
    --neutral-dark: #666;
    --neutral-light: #efefef;
    --error: var(--accent);

    --size-xs: 4px;
    --size-s: 8px;
    --size-m: 12px;
    --size-l: 16px;
    --size-xl: 24px;
    --size-xxl: 32px;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    font-family: "Roboto Light",serif;
  }
`
