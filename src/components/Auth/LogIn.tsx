// Packages
import { ReactElement } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//
import { auth, googleAuthProvider } from "../../service/firebaseConfig";

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

  const signInWithGoogle = () => {
    auth().signInWithPopup(googleAuthProvider).then((result: any) => {
      console.log("result after sign in", result);
    });
  };
  const signInAnonymously = () => {
    auth().signInAnonymously().then((result: any) => {
      console.log("result after sign in", result);
    });
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signInAnonymously}
          >
            Sign In Anonymously
            <Avatar
              style={{ height: "20px", width: "20px", marginLeft: "5px" }}
            />
          </Button>

          <Button
            type="submit"
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
