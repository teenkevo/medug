import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { AiFillCheckCircle, AiOutlineArrowUp } from "react-icons/ai";

export default function AlternateTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <AiOutlineArrowUp style={{ color: "red", margin: "10px" }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <p style={{ fontSize: "12px" }}>Market Ready Product</p>
          <p style={{ fontSize: "9px", color: "grey" }}>1Q-2024</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <AiOutlineArrowUp style={{ color: "red", margin: "10px" }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <p style={{ fontSize: "14px" }}>Beta Launch</p>
          <p style={{ fontSize: "10px", color: "grey" }}>2Q-2024</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <AiOutlineArrowUp style={{ color: "red", margin: "10px" }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <p style={{ fontSize: "15px" }}>A/B Testing</p>
          <p style={{ fontSize: "11px", color: "grey" }}>1Q-2024</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <AiOutlineArrowUp style={{ color: "red", margin: "10px" }} />
        </TimelineSeparator>
        <TimelineContent>
          {/* <AiFillCheckCircle style={{ color: "green", fontSize: "30px" }} /> */}
          <p style={{ fontSize: "16px" }}>R&D (Current)</p>
          <p style={{ fontSize: "12px", color: "grey" }}>2022</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
