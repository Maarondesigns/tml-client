import React from "react";

const RemoveItem = ({ id, thisQuery, removeItem }) => {
  return (
    <button
      id="delete-book"
      onClick={e => {
        //PERMANENTLY DELETE FROM DATABASE
        e.target.parentNode.classList.add("delete-button-clicked");
        setTimeout(() => {
          removeItem({
            variables: {
              id: id
            }
          }).then(() => thisQuery.refetch());
          // this.setState({ selected: null });
        }, 1500);
      }}
    >
      <i className="material-icons" style={{ fontSize: "1.5rem" }}>
        delete
      </i>
    </button>
  );
};

export default RemoveItem;
