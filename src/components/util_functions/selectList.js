import * as d3 from "d3-selection";

export function selectList(list) {
  d3.selectAll(".selected").classed("selected", false);

  if (list === "todo" || list === "reading") {
    if (window.innerWidth <= 500) {
      d3.select(".book-list")
        .transition()
        .duration(500)
        .style("height", "82%");
    }
  } else {
    let height1 = "82%";
    let height2, height3;
    if (list === "grocery") {
      height2 = "82%";
      height3 = "2%";
    } else if (list === "recipe") {
      height2 = "2%";
      height3 = "82%";
    } else if (list === "both") {
      height2 = "42%";
      height3 = "42%";
    }

    if (window.innerWidth <= 500) {
      let listArea = d3.select("#grocery-and-recipe");
      listArea
        .transition()
        .duration(500)
        .style("height", height1);
    }

    d3.select("#grocery-list")
      .transition()
      .duration(1000)
      .style("height", height2);

    d3.select("#recipe-list")
      .transition()
      .duration(1000)
      .style("height", height3);
  }
}
