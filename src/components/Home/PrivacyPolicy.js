import React from "react";
import { hidePolicy } from "../util_functions/hidePolicy";

const PrivacyPolicy = () => {
  return (
    <div id="privacypolicy">
      <div className="close-policy">
        <i
          className="material-icons"
          onClick={() => {
            hidePolicy("privacypolicy");
          }}
        >
          close
        </i>
      </div>
      <iframe
        src="https://termsfeed.com/privacy-policy/10014ce516ddbcac0624ad8372c59dfd"
        frameBorder="0"
        title="privacy-policy"
      />
    </div>
  );
};

export default PrivacyPolicy;
