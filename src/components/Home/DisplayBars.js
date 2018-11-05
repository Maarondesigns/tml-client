import React from "react";

const DisplayBars = ({ incomplete, complete, type }) => {
  let text;
  switch (type) {
    case "Todos":
      text = `${incomplete.length} to do. (${complete.length} completed)`;
      break;
    case "Books":
      text = `${incomplete.length} to read. (${complete.length} finished)`;
      break;
    case "Groceries":
      text = `${incomplete.length} to buy. (${complete.length} bought)`;
      break;
    case "Recipes":
      text = `${incomplete.length} to try. (${complete.length} tried)`;
      break;
    default:
      text = "You shouldn't being seeing this.";
  }
  let totalBars = incomplete.length + complete.length;

  let container = document.querySelector(".stats-container");
  let containerWidth;
  if (container) {
    containerWidth = container.getBoundingClientRect().width - 60;
  }
  let barWidth = containerWidth / (totalBars + 1);
  let barStyles = {
    width: barWidth + "px",
    maxWidth: "20px"
  };
  return (
    <div className="stat-outer-container card">
      <div className="section-title-container">
        <div className="stat-section-title">{type}</div>
      </div>
      <span> {text}</span>
      <div className="stat-bars-container">
        <div className="incomplete-bars-container">
          {incomplete.map((item, index) => {
            let incompleteBarStyles = {
              ...barStyles,
              backgroundColor: "rgb(" + (225 - index * 4) + ", 146, 198)"
            };
            return (
              <div
                id={item.id}
                key={item.id}
                className="stat-bars incomplete"
                style={incompleteBarStyles}
              />
            );
          })}
        </div>
        <div className="complete-bars-container">
          {complete.map(item => {
            let completeBarStyles = {
              ...barStyles,
              backgroundColor: "rgb(66, 146, 198)"
            };
            return (
              <div
                id={item.id}
                key={item.id}
                className="stat-bars complete"
                style={completeBarStyles}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayBars;
