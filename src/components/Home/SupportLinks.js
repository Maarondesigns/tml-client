import React from "react";

//components
import Support from "./Support";
import ReportBug from "./ReportBug";
import { showPolicy } from "../util_functions/showPolicy";

const SupportLinks = () => {
  return (
    <div>
      <span
        className="link-text"
        onClick={() => {
          showPolicy("support-project");
        }}
      >
        Support this Project
      </span>{" "}
      //{" "}
      <span
        className="link-text"
        onClick={() => {
          showPolicy("report-bug");
        }}
      >
        Report Bug
      </span>
      <Support />
      <ReportBug />
    </div>
  );
};

export default SupportLinks;
