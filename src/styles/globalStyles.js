import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${(props) => props.theme.background};
    }

    .container {
         background: ${(props) => props.theme.secondaryBackground};
    }

    p, a, button, h1, h2, h3, h4, h5, h6 {
        color: ${(props) => props.theme.textPrimary};
    }

    button {
        background: ${(props) => props.theme.secondaryBackground};
    }

    .search-container {
        background: ${(props) => props.theme.secondaryBackground};
        color: ${(props) => props.theme.textPrimary};
    }

    input {
        caret-color: ${(props) => props.theme.textPrimary};
    }

    input::placeholder {
        color: ${(props) => props.theme.textPrimary};
    }

    select {
        color: ${(props) => props.theme.textPrimary};
        background: ${(props) => props.theme.secondaryBackground};
    }

    .toggle-container {
        
    }

    .ticker {
        background: ${(props) => props.theme.background};
    }

    .dashboard-column {
        background: ${(props) => props.theme.background};
    }

    table {
        background: ${(props) => props.theme.background};
    }

    table th {
        color: ${(props) => props.theme.textPrimary};
    }

    td, td span {
        color: ${(props) => props.theme.textPrimary};
    }

    .outer-bar {
        background: ${(props) => props.theme.outerBar};
    }

     .inner-bar {
        background: ${(props) => props.theme.innerBar};
    }

    .progess-circle {
        background: ${(props) => props.theme.progressCircle};
    }

    .secondary-background {
        background: ${(props) => props.theme.background};
        color: ${(props) => props.theme.textPrimary};
    }

    .coin-page-chart {
        color: ${(props) => props.theme.textPrimary};
    }

    .currency-converter-input {
        color: ${(props) => props.theme.textPrimary};
        background: ${(props) => props.theme.background};
    }
`

export const darkTheme = {
  background: '#191b1f',
  secondaryBackground: '#2c2f36',
  progressCircle: '#fff',
  outerBar: '#2172E5',
  innerBar: '#fff',
  textPrimary: '#fff',
};


export const lightTheme = {
  background: '#f6f6f8',
  secondaryBackground: '#fff',
  progressCircle: '#2c2f36',
  outerBar: '#2172E5',
  innerBar: '#fff',
  textPrimary: '#000',
};