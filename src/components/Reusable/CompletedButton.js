import React from "react";

const CompleteItem = ({
  id,
  buttonId,
  buttonSymbol,
  thisMutation,
  thisQuery
}) => {
  const complete = (itemId, button) => {
    let completed, text, delay;
    if (button.id === "delete-book") {
      text = button.nextSibling;
      delay = 1500;
    } else if (button.id === "edit-item") {
      text = button.previousSibling;
      delay = 200;
    }
    if (text.classList.contains("completed")) {
      completed = false;
    } else {
      completed = true;
      button.style.position = "absolute";
      button.classList.add("complete-button-clicked");
      text.style.padding = "10px 10px 10px 40px";
    }

    let mutation = thisMutation({
      variables: {
        id: itemId,
        completed: completed
      }
    });
    let query = thisQuery;

    setTimeout(() => {
      mutation.then(() => query.refetch()).then(() =>
        document.querySelectorAll(".book-li").forEach(x => {
          x.classList.add("slide-book-left");
        })
      );
    }, delay);
  };

  return (
    <button
      id={buttonId}
      onClick={e => {
        let button;
        if (e.target.id === buttonId) {
          button = e.target;
        } else {
          button = e.target.parentNode;
        }
        complete(id, button);
      }}
    >
      <i className="material-icons" style={{ fontSize: "1.5rem" }}>
        {buttonSymbol}
      </i>
    </button>
  );
};

export default CompleteItem;
