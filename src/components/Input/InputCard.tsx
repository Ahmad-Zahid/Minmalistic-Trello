// Packages
import React, { useState, useContext } from "react";
import { Paper, InputBase, Button } from "@material-ui/core";
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
  const [points, setPoints] = useState<number | number[]>(1);

  const handleChangeDropdown = (selected: { value: string }) => {
    setUser(selected.value);
  };
  const handleOnInputChange = (e: any): void => {
    setTitle(e.target.value);
  };

  const handleBtnConfirm = (): void => {
    if (type === "card") {
      addMoreCard(title, listId, user, points);
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
  const storypoints = [
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
      value: 13,
      label: "13",
    },
  ];

  function valuetext(value: any) {
    return `${value}`;
  }
  const onChangeSlider = (event: any, value: number | number[]) => {
    setPoints(value);
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
        {
          <div style={{ marginLeft: "15px" }}>
            Choose story points
            <Slider
              getAriaValueText={valuetext}
              step={null}
              min={1}
              style={{ width: "200px" }}
              valueLabelDisplay="auto"
              marks={storypoints}
              max={13}
              onChangeCommitted={onChangeSlider}
            />
          </div>
        }
      </div>
      <div className={classes.confirm}>
        <Button
          disabled={isAddDisabled()}
          className={classes.btnConfirm}
          onClick={handleBtnConfirm}
        >
          {type === "card" ? "Add Card" : "Add List"}
        </Button>
        <Button className={classes.btnCancel} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
