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
  const { removeCard, editCard } = useContext(context);
  const { user, title: titleProps, id } = card;
  const { name } = user;

  const [showSubContainer, setShowSubContainer] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(titleProps);
  const classes = useStyle();

  const handleClick = (type: string) => {
    if (type === "remove") removeCard(card);
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
    editCard(modifiedCard);
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

            <Typography>{name ? name.first : ""}</Typography>
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
