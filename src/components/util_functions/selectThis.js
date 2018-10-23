import * as d3 from "d3-selection";
import { transition, duration } from "d3-transition";
import { interpolateNumber } from "d3-interpolate";

export function selectThis(target) {
  let parent = target.parentNode.parentNode;
  if (window.innerWidth <= 500) {
    if (parent.id === "recipe-list" || parent.id === "grocery-list") {
      d3.select("#grocery-list")
        .transition()
        .duration(1000)
        .style("height", "8%");

      d3.select("#recipe-list")
        .transition()
        .duration(1000)
        .style("height", "8%");

      d3.select("#grocery-and-recipe")
        .transition()
        .duration(500)
        .style("height", "15%");
    } else {
      d3.select(".book-list")
        .transition()
        .duration(500)
        .style("height", "20%");
    }
  }

  d3.selectAll(".selected").classed("selected", false);
  if (target !== null) target.classList.add("selected");
  setTimeout(() => {
    //my ridiculous way to get scrollTop to transition
    let i = interpolateNumber(parent.scrollTop, target.offsetTop);
    let j = 0.0;
    let interval = setInterval(() => {
      parent.scrollTop = i(j);
      j += 0.1;
      if (j > 1) {
        clearInterval(interval);
      }
    }, 20);
  }, 500);
}
