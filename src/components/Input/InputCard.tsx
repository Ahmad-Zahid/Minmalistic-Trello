// Packages
import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector } from "react-redux";

// Utils
import storeApi from "../../utils/context";

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: fade("#5AAC44", 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
interface InputCardProps {
  setOpen: (value: boolean) => void;
  listId: string;
  type: string;
}

export default function InputCard({
  setOpen,
  listId,
  type,
}: InputCardProps): React.ReactElement {
  const classes = useStyle();
  const users = useSelector((state: any) => state.users.users);
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState<string>("");
  const [user, setUser] = useState<any>("");

  const handleChange = (event: any) => {
    setUser(event.target.value);
  };
  const handleOnChange = (e: any): void => {
    setTitle(e.target.value);
  };
  const handleBtnConfirm = (): void => {
    if (type === "card") {
      addMoreCard(title, listId, user);
      setTitle("");
      setOpen(false);
    } else {
      addMoreList(title);
      setTitle("");
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            onBlur={() => setOpen(false)}
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={title}
            placeholder={
              type === "card"
                ? "Enter a title of this card.."
                : "Enter list title..."
            }
          />
        </Paper>
        {type === "card" && (
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Select Member</InputLabel>
            <Select
              native
              value={user.name ? user.name.first + " " : user}
              onChange={handleChange}
              inputProps={{
                name: "members",
                id: "members-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {users.length > 0 &&
                users.map((item: any) => {
                  return (
                    <option value={item}>
                      {item.name.first + " " + item.name.last}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
        )}
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
          {type === "card" ? "Add Card" : "Add List"}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <Clear />
        </IconButton>
      </div>
    </div>
  );
}
