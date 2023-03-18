import "./style.css";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { BiMailSend } from "react-icons/bi";
import CustomizedStepper from "./CustomizedStepper";

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
        <Paper
          style={{
            width: "100%",
            borderTop: "30px solid red",
            borderRadius: "20px",
            padding: "50px",
            boxShadow:
              "rgb(0 0 0 / 10%) 0px 0px 15px -3px, rgb(0 0 0 / 10%) 0px 4px 6px -10px",
          }}
          elevation={3}
        >
          <img
            style={{
              maxWidth: "200px",
            }}
            src="https://static.wixstatic.com/media/03008d_2282c8a2fb8c4ed4ab4e222d4c01dd9c~mv2.png"
            alt="logo"
          />
          <p
            style={{
              fontWeight: "bolder",
              fontSize: "7vmin",
              fontFamily: "Inter",
              marginTop: "10px",
              color: "black",
            }}
          >
            <span
              style={{
                color: "rgb(102, 102, 102)",
                fontFamily: "Inter",
                fontSize: "7vmin",
              }}
            >
              Democratising{" "}
            </span>
            Uganda's Health Data
          </p>
          <p
            style={{
              fontSize: "2vmin",
              fontFamily: "Inter",
              marginTop: "20px",
              color: "grey",
            }}
          >
            For the Public, Research Institutions and Government Organizations.
          </p>
        </Paper>
        <p
          style={{
            marginTop: "30px",
            fontWeight: "800",
            fontSize: "4vmin",
            fontFamily: "ubuntu",
            color: "#ED5840",
            background:
              "-webkit-linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
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
            color: "black",
            fontWeight: "800",
          }}
          variant="h1"
        >
          Read our White Paper to learn more
        </Typography>
        <div style={{ marginTop: "30px" }}>
          <CustomizedStepper />
        </div>
        <BiMailSend
          style={{ marginTop: "50px", color: "white" }}
          fontSize={30}
        />
        <div>
          <a
            href="mailto:sonia.salim@icloud.com"
            style={{
              color: "grey",
              fontSize: "12px",
              marginRight: "20px",
              fontWeight: "bold",
            }}
          >
            Sonia Salim
          </a>
          <a
            href="mailto:luwembamugumya@gmail.com"
            style={{
              color: "grey",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Kevin Mugumya
          </a>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
