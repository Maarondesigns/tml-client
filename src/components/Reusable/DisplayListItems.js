import React from "react";

//components
import CompleteItem from "../Reusable/CompletedButton";
import RemoveItem from "../Reusable/RemoveItem";
import { showAddForms } from "../util_functions/showAddForms";

const DisplayListItems = ({
  data,
  mutation,
  user,
  type,
  filter,
  selectItem,
  editItem,
  removeItem
}) => {
  if (data.loading === true) {
    return <div style={{ textAlign: "center" }}>Loading Items...</div>;
  } else if (!user) {
    return (
      <a href="/home" style={{ textAlign: "center", display: "block" }}>
        Please sign in...
      </a>
    );
  } else {
    let dataType = data[type];
    let fontSize = { fontSize: "1.5rem" };

    if (dataType.length === 0) {
      return (
        <li
          className="add-first-item book-li slide-book-left"
          onClick={() => {
            showAddForms();
          }}
        >
          <button id="edit-item">
            <i className="material-icons" style={fontSize}>
              add
            </i>
          </button>
          <div className="booklist-text">Add your first item!</div>
        </li>
      );
    }
    if (filter) {
      dataType = filter;
    }

    let incompleteItems = dataType.filter(x => x.completed !== true);
    let completeItems = dataType.filter(x => x.completed === true);

    if (type === "todos") {
      incompleteItems.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    } else {
      incompleteItems.forEach(item => {
        if (!item.order) {
          item.order = 0;
        }
      });
      incompleteItems.sort((a, b) => a.order - b.order);
    }

    return (
      <div>
        {incompleteItems.map((item, index) => {
          function deadline() {
            if (type !== "todos") {
              return <span />;
            } else {
              let timeUntilDeadline = Math.ceil(
                (new Date(item.deadline).getTime() - new Date().getTime()) /
                  86400000
              );
              let color = `rgb(${255 - timeUntilDeadline * 10}, 146,198)`;

              let textStyle = {
                color: color
              };
              if (timeUntilDeadline < 0) {
                textStyle = {
                  color: "rgb(255,0,0",
                  textDecoration: "underline"
                };
              }
              return (
                <span style={textStyle}>(in {timeUntilDeadline} days)</span>
              );
            }
          }

          return (
            <li
              className={"book-li li-type-" + type}
              id={item.id}
              data-order={item.order}
              key={item.id}
            >
              <CompleteItem
                buttonId={"delete-book"}
                buttonSymbol={"check"}
                id={item.id}
                thisQuery={data}
                thisMutation={mutation}
              />
              <div className="booklist-text" onClick={e => selectItem(e, item)}>
                {item.name} {deadline()}
              </div>
              <button id="edit-item" onClick={e => editItem(e, item)}>
                <i className="material-icons" style={fontSize}>
                  edit
                </i>
              </button>
            </li>
          );
        })}
        {completeItems.map((item, index) => {
          return (
            <li className="book-li" id={item.id} key={item.id}>
              <RemoveItem
                id={item.id}
                thisQuery={data}
                removeItem={removeItem}
              />
              <div className="booklist-text completed">{item.name}</div>
              <CompleteItem
                buttonId={"edit-item"}
                buttonSymbol={"arrow_upward"}
                id={item.id}
                thisQuery={data}
                thisMutation={mutation}
              />
            </li>
          );
        })}
      </div>
    );
  }
};

export default DisplayListItems;
