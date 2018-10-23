import React, { Component } from "react";
import { hidePolicy } from "../util_functions/hidePolicy";

class ReportBug extends Component {
  state = {
    name: "",
    time: "",
    description: ""
  };

  showMailLink = () => {
    let href = `mailto:maarondesigns@gmail.com?subject=Bug Report&body=Submitted By: ${
      this.state.name
    }%0D%0DWhen it occured: ${this.state.time}%0D%0DDescription: ${
      this.state.description
    }`;
    return (
      <a href={href} className="submit-bug-report btn">
        Submit
      </a>
    );
  };

  render() {
    return (
      <div id="report-bug">
        <div className="close-policy">
          <i
            className="material-icons"
            onClick={() => {
              hidePolicy("report-bug");
            }}
          >
            close
          </i>
        </div>
        <div className="row">
          <div className="row">
            <div className="input-field col m6 s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="your-name"
                type="text"
                className="validate"
                onChange={e => this.setState({ name: e.target.value })}
              />
              <label for="your-name">Your Name</label>
            </div>
            <div className="input-field col m6 s12">
              <i className="material-icons prefix">access_time</i>
              <textarea
                id="when-occured"
                type="tel"
                className="materialize-textarea"
                onChange={e => this.setState({ time: e.target.value })}
              />
              <label for="when-occured">When the bug/error occured.</label>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">description</i>
              <textarea
                id="describe-bug"
                type="tel"
                className="materialize-textarea"
                onChange={e => this.setState({ description: e.target.value })}
              />
              <label for="describe-bug">Please describe what happened.</label>
            </div>
            <div>
              <br />
              {this.showMailLink()}
              <br />
              (opens email client)
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportBug;
