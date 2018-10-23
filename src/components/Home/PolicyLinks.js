import React from "react";

//components
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import { showPolicy } from "../util_functions/showPolicy";

const PolicyLinks = () => {
  return (
    <div>
      <span
        className="link-text"
        onClick={() => {
          showPolicy("privacypolicy");
        }}
      >
        Privacy Policy
      </span>{" "}
      //{" "}
      <span
        className="link-text"
        onClick={() => {
          showPolicy("termsofservice");
        }}
      >
        Terms of Service
      </span>
      <PrivacyPolicy />
      <TermsOfService />
    </div>
  );
};

export default PolicyLinks;
