import React from "react";
import { hidePolicy } from "../util_functions/hidePolicy";

const Support = () => {
  return (
    <div id="support-project">
      <div className="close-policy">
        <i
          className="material-icons"
          onClick={() => {
            hidePolicy("support-project");
          }}
        >
          close
        </i>
      </div>
      <div className="thanks-for-supporting">
        <h6>
          <strong>Thank you for supporting this project!</strong>
        </h6>
        <iframe
          title="giphy"
          src="https://giphy.com/embed/IcGkqdUmYLFGE"
          width="80%"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
        <p>
          {" "}
          I am just one humble human trying to make something useful.Any amount
          you give helps me to spend more time on this project and continue
          making it better.
        </p>
        <p>
          <a href="https://paypal.me/MichaelAaronDesigns" className="btn">
            Donate through PayPal
          </a>
        </p>
        <p>
          You can also support the project simply by clicking on the links to
          Amazon, Walmart, etc. in the item details secitons, which connect to
          their respective affiliate program, and then buy your item (or more).
        </p>
      </div>
    </div>
  );
};

export default Support;
