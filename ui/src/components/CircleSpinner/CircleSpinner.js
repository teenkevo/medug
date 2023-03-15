import React from "react";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";

export default function CircleSpinner() {
  return (
    <UseAnimations
      animation={infinity}
      size={40}
      fillColor="#ff5e00"
      strokeColor="#ff5e00"
      wrapperStyle={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
