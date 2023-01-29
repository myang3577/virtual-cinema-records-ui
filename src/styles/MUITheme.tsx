// https://material-ui.com/customization/color/#color
import { lightGreen,teal } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

export const tealLightGreenTheme = createMuiTheme({
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
      centered: {
        minHeight: 0,
        width: "100%",
      },
    },
    MuiTab: {
      root: {
        "&:hover": {
          color: teal[400],
        },
        minHeight: 0,
      },
      fullWidth: {
        minWidth: 0,
        width: "20%",
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
