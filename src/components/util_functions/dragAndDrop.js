export function dragAndDrop() {
  //get all the list items
  let elements = document.querySelectorAll(".book-li");
  //add click and drag functions for each
  elements.forEach(element => {
    //to be set when dragging
    let timeout;

    let mouseDown = function(e) {
      // so text is not highlighted when dragging
      document.onselectstart = function() {
        return false;
      };
      //drag only executed if mousedown for more than 1s
      timeout = setTimeout(() => {
        dragging(e);
      }, 600);
    };
    element.addEventListener("mousedown", mouseDown, false);
    element.addEventListener("touchstart", mouseDown, false);

    function dragging(event) {
      //e.target is the text, parentNode is the whole list item (on Chrome, haven't tested other browsers)
      let e = /touch/.test(event.type) ? event.targetTouches[0] : event;

      let li = e.target.parentNode;
      //make original li invisible
      li.style.opacity = 0;
      //parent div, or ul
      let ul = li.parentNode;
      //clone li to make copy to move around screen
      let clone = li.cloneNode(true);
      //append clone to body
      let newLi = document.body.appendChild(clone);
      //make clone look the same as li
      let newLiStyle =
        "position: absolute;display:flex;background-color:white;color:#4292c6;";
      newLi.style.cssText = newLiStyle;
      //move clone li with mouse
      function moveEl(x, y) {
        newLi.style.top = y - newLi.offsetHeight / 2 + "px";
        newLi.style.left = x - newLi.offsetWidth / 2 + "px";
      }
      moveEl(e.pageX, e.pageY);
      //trigger the movement on whole body
      let mouseMove = event => {
        let e = /touch/.test(event.type) ? event.targetTouches[0] : event;
        moveEl(e.pageX, e.pageY);
        //necessary variables
        let moveUp, moveDown;
        let previous = li.previousSibling;
        let next = li.nextSibling;
        //setting moveUp and moveDown if item is not at top or bottom of ul
        if (previous) {
          moveUp = previous.getBoundingClientRect().top;
        }
        if (next) {
          moveDown = next.nextSibling.getBoundingClientRect().top;
        }
        //return if li is at very top or bottom of ul
        if (!moveUp && !moveDown) {
          return;
        }
        //move actual li, not clone, up or down depending on location of clone
        if (Math.abs(e.pageY - moveUp) < 10) {
          ul.insertBefore(li, previous);
        } else if (Math.abs(e.pageY - moveDown) < 10) {
          ul.insertBefore(li, next.nextSibling);
        }
      };
      document.body.addEventListener("mousemove", mouseMove, false);
      document.body.addEventListener("touchmove", mouseMove, false);

      //remove clone, make li visible, and remove mousemove listener on mouseup
      let mouseUp = e => {
        li.style.opacity = 1;
        ul.childNodes.forEach((li, index) =>
          li.setAttribute("data-order", index + 1)
        );
        newLi.remove();
        document.body.removeEventListener("mousemove", mouseMove);
        document.body.removeEventListener("touchmove", mouseMove);
      };
      document.body.addEventListener("mouseup", mouseUp, false);
      document.body.addEventListener("touchend", mouseUp, false);
    }

    let elMouseUp = function() {
      //clear interval if it hasn't yet executed
      clearInterval(timeout);
      //highlight text is okay again
      document.onselectstart = function() {
        return true;
      };
    };
    element.addEventListener("mouseup", elMouseUp, false);
    element.addEventListener("touchend", elMouseUp, false);
  });
}
