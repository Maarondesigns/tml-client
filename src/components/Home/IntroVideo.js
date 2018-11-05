import React, { Component } from "react";

class IntroVideo extends Component {
  state = {
    showVideo: false
  };
  render() {
    if (this.state.showVideo === true) {
      return (
        <iframe
          title="intro-video"
          src="https://res.cloudinary.com/travel-blog/video/upload/v1540593135/10000000_1911750812233935_7010869609694324669_n.mp4"
          width="250"
          height="400"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen={true}
        />
      );
    } else {
      return (
        <div className="intro-video-container">
          <button
            className="show-video btn"
            onClick={() => this.setState({ showVideo: true })}
          >
            Watch Intro Video
          </button>
        </div>
      );
    }
  }
}

export default IntroVideo;
