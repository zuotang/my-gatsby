import React from "react"
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange,blue } from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#5e72e4'
    },
    action:{
      hover:'#f6f9fc'
    }
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      containedPrimary: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
     
    },
    MuiDrawer:{
      paperAnchorDockedLeft:{
        // borderRight: 0
      }
    }
  },
});


export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider >
)

//#5e72e4!important


/*
--blue: #5e72e4;
    --indigo: #5603ad;
    --purple: #8965e0;
    --pink: #f3a4b5;
    --red: #f5365c;
    --orange: #fb6340;
    --yellow: #ffd600;
    --green: #2dce89;
    --teal: #11cdef;
    --cyan: #2bffc6;
    --white: #fff;
    --gray: #8898aa;
    --gray-dark: #32325d;
    --light: #ced4da;
    --lighter: #e9ecef;
    --primary: #5e72e4;
    --secondary: #f7fafc;
    --success: #2dce89;
    --info: #11cdef;
    --warning: #fb6340;
    --danger: #f5365c;
    --light: #adb5bd;
    --dark: #212529;
    --default: #172b4d;
    --white: #fff;
    --neutral: #fff;
    --darker: black;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: Open Sans,sans-serif;
     */