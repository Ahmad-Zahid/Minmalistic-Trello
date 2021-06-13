// Packages
import { ReactElement, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "firebase/app";

//

// import { useAuth } from "../../utils/firebaseContext";
import context from "../../utils/context";
import { useAuth } from "../../routes";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  googleButton: {
    margin: theme.spacing(0.1, 0, 0.5),
  },
}));

export default function Login(): ReactElement {
  const classes = useStyles();
  const { loginAnonymously ,loginWithGoogle} = useAuth();

  const signInWithGoogle = async() => {
    const response = await loginWithGoogle();
    console.log("response", response);
    
  };
  const signInAnonymously = async () => {
    const response = await loginAnonymously();
    console.log("response", response);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>signInAnonymously()}
          >
            Sign In Anonymously
            <Avatar
              style={{ height: "20px", width: "20px", marginLeft: "5px" }}
            />
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.googleButton}
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </form>
      </div>
    </Container>
  );
}
