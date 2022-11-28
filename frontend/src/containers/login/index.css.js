import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    loginPage: (props) => {
      return {
        height: "100vh",
        justifyContent: "center",
        alignTtems: "center",
      };
    },
    intro: (props) => {
      return {
        width: "100%",
        backgroundImage: "url(./images/auth-bg.jpg)",
        alignTtems: "center",
        backgroundColor: "#fff",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flex: "1 1",
        flexDirection: "column",
        justifyContent: "center",
      };
    },
    form: (props) => {
      return {
        padding: "32px",
      };
    },
  };
});
