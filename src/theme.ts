import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#82954B',
      light: '#BABD42'
    },
    secondary: {
      main: '#EFD345',
      light: "#FFEF82"
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      '"Jost"',
    ].join(','),
  },
});

export default theme;