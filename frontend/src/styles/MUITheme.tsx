import { createMuiTheme } from "@material-ui/core/styles";
// https://material-ui.com/customization/color/#color
import { teal, lightGreen } from "@material-ui/core/colors";

export const tealLightGreenTheme = createMuiTheme({
  typography: {
    fontFamily: ["Khand"].join(","),
  },
  palette: {
    primary: {
      main: teal[400],
    },
    secondary: {
      main: lightGreen[500],
    },
  },
  overrides: {
    MuiTabs: {
      root: {
        minHeight: 0,
      },
    },
    MuiTab: {
      root: {
        "&:hover": {
          color: teal[400],
        },
        minHeight: 0,
      },
    },
    MuiCardHeader: {
      root: {
        width: "100%",
        height: 85,
      },
    },
    MuiCardContent: {
      root: {
        width: "100%",
        height: 80,
      },
    },
    MuiCardMedia: {
      media: {
        objectFit: "contain",
        height: 450,
        width: "100%",
      },
    },
  },
});
