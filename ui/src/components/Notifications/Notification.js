import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function Notification({
  message,
  status,
  open,
  handleClose,
  handleExited,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      open={open}
      autoHideDuration={5000} //calls onClose after 5000ms (5secs)
      onClose={handleClose}
      onExited={handleExited}
    >
      <Alert variant="filled" elevation={6} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
}
