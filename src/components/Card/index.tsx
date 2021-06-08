// Packages
import { useContext, useState, ReactElement } from "react";
import { Paper, Typography, InputBase } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { Check, Delete, Edit } from "@material-ui/icons";

// Utils
import context from "../../utils/context";

// Types
import { UserType } from "../../constants/types";

// Stylesheet
import { useStyle } from "./styles";
interface CardProps {
  card: {
    id: string;
    title: string;
    user: UserType;
  };
  index: number;
}
export default function Card({ card, index }: CardProps): ReactElement {
  const { editOrRemoveCard } = useContext(context);
  const { user, title: titleProps, id } = card;
  const [showSubContainer, setShowSubContainer] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(titleProps);
  const classes = useStyle();

  const handleClick = (type: string) => {
    if (type === "remove") editOrRemoveCard(card, "remove");
    else setIsEditable(true);
  };

  const handleOnInputChange = (e: any): void => {
    setTitle(e.target.value);
  };

  const onSave = () => {
    const modifiedCard = {
      id: id,
      title: title,
      user: user,
    };
    editOrRemoveCard(modifiedCard, "edit");
    setIsEditable(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper
            onMouseEnter={() => setShowSubContainer(true)}
            onMouseLeave={() => setShowSubContainer(false)}
            className={classes.card}
          >
            <div style={{ flexDirection: "column" }}>
              {isEditable ? (
                <InputBase
                  onChange={handleOnInputChange}
                  multiline
                  fullWidth
                  value={title}
                />
              ) : (
                <Typography>{title}</Typography>
              )}
              <Typography variant="subtitle2">{user ? user : ""}</Typography>
            </div>
            {showSubContainer && !isEditable && (
              <div>
                <Edit onClick={() => handleClick("edit")} />
                <Delete onClick={() => handleClick("remove")} />
              </div>
            )}
            {isEditable && <Check color="secondary" onClick={onSave} />}
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
