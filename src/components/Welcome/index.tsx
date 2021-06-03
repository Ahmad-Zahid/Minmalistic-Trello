// Packages
import { useState, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CirclePicker } from "react-color";
import { useHistory } from "react-router-dom";

// Navigation
import { useAuth } from "../../routes";

// Constants
import { routes } from "../../constants/routes";

const useStyle = makeStyles(() => ({
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: "lightblue",
    alignItems: "center",
    flexDirection: "column",
  },
  body: {
    display: "flex",
    width: "100vw",
    height: "50vh",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    width: "20vw",
    marginBottom: 10,
    textDecorationLine: "none",
  },
}));

export default function Welcome(): ReactElement {
  const [currentColor, setCurrentColor] = useState("#000");
  const [pickColor, setPickColor] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();
  const auth: any = useAuth();
  const classes: any = useStyle();

  const handleColorChange = ({ hex }: { hex: any }) => {
    setCurrentColor(hex);
  };

  const handOnChangeText = (event: any) => {
    setTitle(event.target.value);
    if (event.target.value !== "") setPickColor(true);
    else setPickColor(false);
  };
  const onButtonPress = () => {
    const user = {
      title: title,
      color: currentColor,
    };
    auth.signin(user, () => {
      history.replace({
        pathname: routes.board,
      });
    });
  };

  return (
    <div className={classes.container}>
      <Typography variant="h2" gutterBottom>
        Welcome to Trello
      </Typography>
      <Typography variant="h5" gutterBottom>
        Get Started with Trello by creating a new board!
      </Typography>

      <div className={classes.body}>
        <TextField
          className={classes.input}
          label="Board title"
          variant="filled"
          onChange={handOnChangeText}
        />
        {pickColor && (
          <div
            style={{
              marginBottom: 15,
            }}
          >
            <CirclePicker
              color={currentColor}
              onChangeComplete={handleColorChange}
            />
          </div>
        )}

        <Button
          style={{ backgroundColor: currentColor }}
          onClick={onButtonPress}
          variant="contained"
          color="secondary"
        >
          Create
        </Button>
      </div>
    </div>
  );
}
