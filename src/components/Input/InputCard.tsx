// Packages
import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import Slider from "@material-ui/core/Slider";

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
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 12,
      label: "12",
    },
  ];

  function valuetext(value: any) {
    return `${value}`;
  }
  const onChangeSlider =(event: any, value: number | number[])=>{
    console.log('slider value',value)
  }
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
       { 
       <div style={{marginLeft:'15px'}}>
        Choose story points
       <Slider
          getAriaValueText={valuetext}
          step={null}
          style={{width:'200px',}}
          valueLabelDisplay="auto"
          marks={marks}
          max={12}
          onChangeCommitted={onChangeSlider}
        /></div>}
      </div>
      <div className={classes.confirm}>
        <Button
          disabled={isAddDisabled()}
          className={classes.btnConfirm}
          onClick={handleBtnConfirm}
        >
          {type === "card" ? "Add Card" : "Add List"}
        </Button>
        <Button
          className={classes.btnCancel}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
