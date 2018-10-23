import React from "react";
import { hidePolicy } from "../util_functions/hidePolicy";

const TermsOfService = () => {
  return (
    <div id="termsofservice">
      <div className="close-policy">
        <i
          className="material-icons"
          onClick={() => {
            hidePolicy("termsofservice");
          }}
        >
          close
        </i>
      </div>
      <iframe
        src="https://termsfeed.com/terms-conditions/bb58b5504b1bde748f83deaa960774ee"
        frameBorder="0"
        title="terms-of-service"
      />
    </div>
  );
};

export default TermsOfService;
