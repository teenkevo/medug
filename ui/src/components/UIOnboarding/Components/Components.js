import React from "react";
import { IconButton } from '@mui/material';
import { components } from "@reactour/tour";
import { AiFillCloseCircle } from "react-icons/ai";

export function Badge({ children }) {
  return (
    <components.Badge
      styles={{ badge: (base) => ({ ...base, backgroundColor: "red" }) }}
    >
      👉 {children} 👈
    </components.Badge>
  );
}

export function Close({ onClick }) {
  return (
    <IconButton
      edge="end"
      color="inherit"
      onClick={onClick}
      aria-label="close"
      size="small"
      style={{ marginBottom: "10px", position: "absolute", right: 15, top: 20 }}
    >
      <AiFillCloseCircle size={25} style={{ color: "grey" }} />
    </IconButton>
  );
}
