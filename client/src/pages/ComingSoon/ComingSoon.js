import "./style.css";
import React from "react";
import { Paper, Typography } from "@mui/material";
import AlternateTimeline from "./AlternateTimeLine";

function ComingSoon() {
  return (
    <div className="background">
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          alignItems: "center",
          textAlign: "center",
          transform: "translate(-50%, -50%)",
          padding: "10px",
        }}
      >
        <img
          style={{ maxWidth: "300px" }}
          src="https://static.wixstatic.com/media/03008d_2282c8a2fb8c4ed4ab4e222d4c01dd9c~mv2.png"
          alt="logo"
        />
        <p
          style={{
            fontWeight: "bolder",
            fontSize: "8vmin",
            fontFamily: "ubuntu",
            marginTop: "10px",
          }}
        >
          Democratising Uganda's Health Data
        </p>
        <p
          style={{
            marginTop: "50px",
            fontWeight: "800",
            fontSize: "4vmin",
            fontFamily: "ubuntu",
            color: "#D81100",
          }}
        >
          Coming Soon
        </p>
        <Typography
          style={{
            textAlign: "center",
            fontSize: "15px",
            marginTop: "10px",
            marginBottom: "20px",
            color: "grey",
            fontWeight: "500",
          }}
          variant="h1"
        >
          Read our White Paper to learn more
        </Typography>
        <AlternateTimeline />
      </div>
    </div>
  );
}

export default ComingSoon;
