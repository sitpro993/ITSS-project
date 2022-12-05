import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    logo: (props) => {
      return {
        "& a": {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          "& svg": {
            backgroundColor: "#fff",
            borderRadius: "50%",
          },
        },
      };
    },
  };
});
