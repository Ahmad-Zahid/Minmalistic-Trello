import React, { useState } from "react";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

const grid = 8;
const getItemStyle = (isDragging: boolean, draggableStyle:any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  minHeight:20,
  width:200,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
interface CardProps {
  item: {
    id: string;
    index: number;
    content:any
  };
  ind: number;
  index: number;
  onPress:()=>void
}
function Card({ item, ind, index ,onPress}: CardProps): React.ReactElement {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {item.content}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
