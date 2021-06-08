// Packages
import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Utils
import storeApi from "../../utils/context";

// Types
import { UserType } from "../../constants/types";

// Stylesheet
import { useInputCardStyle } from "./styles";

const styles = {
  container: (css: any) => ({ ...css, width: "200px" }),
};
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
  const classes = useInputCardStyle();
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState<string>("");
  const [user, setUser] = useState<UserType | string>("");

  const handleChangeDropdown = (selected: any) => {
    setUser(selected.value);
  };
  const handleOnInputChange = (e: any): void => {
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

  const isAddDisabled = () => {
    if (title === "") return true;
    if (type === "card" && user === "") return true;
    return false;
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnInputChange}
            multiline
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
          <Dropdown
            styles={styles}
            handleChangeDropdown={handleChangeDropdown}
            placeholder={"Select User"}
          />
        )}
      </div>
      <div className={classes.confirm}>
        <Button
          disabled={isAddDisabled()}
          className={classes.btnConfirm}
          onClick={handleBtnConfirm}
        >
          {type === "card" ? "Add Card" : "Add List"}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <Clear />
        </IconButton>
      </div>
    </div>
  );
}
