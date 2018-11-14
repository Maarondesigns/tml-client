import * as d3 from "d3-selection";
import { transition, duration } from "d3-transition";
import { interpolateString } from "d3-interpolate";

export function showAddForms() {
  let form = document.getElementById("add-forms");
  let currentHeight = form.getBoundingClientRect().height;
  let fullHeight = 0;
  form.childNodes.forEach(
    x => (fullHeight += x.getBoundingClientRect().height)
  );

  if (Math.round(currentHeight) === 20) {
    //had to add Math.round() because of Ms Edge
    d3.select("#add-forms")
      .transition()
      .duration(300)
      .styleTween("height", () => {
        return interpolateString(currentHeight + "px", fullHeight + 40 + "px");
      });

    d3.select("#add-button").html("-");
  } else {
    d3.select("#add-forms")
      .transition()
      .duration(300)
      .styleTween("height", () => {
        return interpolateString(currentHeight + "px", "20px");
      });
    d3.select("#add-button").html("+");
  }

  let interval = setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 30);

  setTimeout(() => {
    clearInterval(interval);
  }, 300);

  // window.scrollTo(0, fullHeight);
}
