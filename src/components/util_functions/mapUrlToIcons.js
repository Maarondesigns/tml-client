import React from "react";

//icons
import fbIcon from "../../img/social_icons/facebook.png";
import instaIcon from "../../img/social_icons/instagram.png";
import linkdIcon from "../../img/social_icons/linkedin.png";
import twitIcon from "../../img/social_icons/twitter.png";
import pinIcon from "../../img/social_icons/pinterest.png";
import youIcon from "../../img/social_icons/youtube.png";
import tumIcon from "../../img/social_icons/tumblr.png";
import webIcon from "../../img/social_icons/website.png";

export function mapUrlToIcons(urlArray) {
  return urlArray.map(link => {
    if (link.includes("instagram"))
      return (
        <div className="links-icons" key="instagram">
          <a href={link}>
            <img
              title={link}
              alt="Instagram Icon"
              src={instaIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
    else if (link.includes("facebook"))
      return (
        <div className="links-icons" key="facebook">
          <a href={link}>
            <img
              title={link}
              alt="Facebook Icon"
              src={fbIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
    else if (link.includes("linkedin"))
      return (
        <div className="links-icons" key="linkedin">
          <a href={link}>
            <img
              title={link}
              alt="LinkedIn Icon"
              src={linkdIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
    else if (link.includes("twitter"))
      return (
        <div className="links-icons" key="twitter">
          <a href={link}>
            <img
              title={link}
              alt="Twitter Icon"
              src={twitIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
    else if (link.includes("pinterest"))
      return (
        <div className="links-icons" key="pinterest">
          <a href={link}>
            <img
              title={link}
              alt="Pinterest Icon"
              src={pinIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
    else if (link.includes("youtube"))
      return (
        <div className="links-icons" key="youtube">
          <a href={link}>
            <img
              title={link}
              alt="Youtube Icon"
              src={youIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
    else if (link.includes("tumblr"))
      return (
        <div className="links-icons" key="tumblr">
          <a href={link}>
            <img
              title={link}
              alt="Tumblr Icon"
              src={tumIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
    else
      return (
        <div className="links-icons" key="website">
          <a href={link}>
            <img
              title={link}
              alt="Website Icon"
              src={webIcon}
              height="30px"
              width="30px"
            />
          </a>
        </div>
      );
  });
}
