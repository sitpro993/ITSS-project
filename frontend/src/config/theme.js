export const custormTheme = {
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",

          "&.Mui-focused": {
            color: "#6F7CF3",
          },

          "& .MuiFormLabel-asterisk": {
            color: "#D83131",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,

          // '& .MuiOutlinedInput-input': {
          //   padding: '12px 12px',
          // },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6F7CF3",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6F7CF3",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          // color: "#fff",
          // backgroundColor: "#5A26ED",
          borderRadius: 6,
          paddingBottom: "10px",
          paddingTop: "10px",
          textTransform: "capitalize",

          "&:hover": {
            // backgroundColor: "#6F7CF3",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#6F788B",
          "&.Mui-checked": {
            color: "#6F7CF3",
          },
        },
      },
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
      //lineHeight:
      //letterSpacing:
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
      //lineHeight:
      //letterSpacing:
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
      //lineHeight:
      //letterSpacing:
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
      //lineHeight:
      //letterSpacing:
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.25rem",
      //lineHeight:
      //letterSpacing:
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.125rem",
      //lineHeight:
      //letterSpacing:
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: "0.875rem",
      //lineHeight:
      //letterSpacing:
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      //lineHeight:
      //letterSpacing:
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      //lineHeight:
      //letterSpacing:
    },
    body2: {
      fontWeight: 300,
      fontSize: "1rem",
      //lineHeight:
      //letterSpacing:
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      //lineHeight:
      //letterSpacing:
    },
  },
};
