import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//queries
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  addAuthorMutation
} from "../../queries/bookqueries";
import { getUserQuery } from "../../queries/userqueries";

//functions
import { selectList } from "../util_functions/selectList";
import { showAddForms } from "../util_functions/showAddForms";

class AddAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      bookName: "",
      bookGenre: ""
    };
  }

  submitBookAlso() {
    setTimeout(() => {
      let bookName = document.getElementById("book_name");
      let genre = document.getElementById("genre");
      let authorName = document.getElementById("first_name");
      let authorAge = document.getElementById("age");
      let addAuth = document.getElementById("add-author");
      let addBook = document.getElementById("add-book-button");
      let select = document.querySelector("select");
      let bookList = document.querySelector(".book-list");
      let text = authorName.nextSibling;
      let bookText = bookName.nextSibling;

      let author = this.props.getAuthorsQuery.authors.filter(
        author => authorName.value === author.name
      );

      this.props
        .addBookMutation({
          variables: {
            name: bookName.value,
            genre: genre.value.split(",").map(x => x.trim()),
            authorId: author[0].id,
            userId: this.props.getUserQuery.user.id
          }
        })
        .then(() => this.props.getBooksQuery.refetch())
        .then(data => {
          //return label to normal
          text.innerHTML = "Author Name";
          bookText.innerHTML = "Book Name";
          text.style.color = "#9e9e9e";
          bookText.style.color = "#9e9e9e";
          //clear form field values
          bookName.value = genre.value = authorName.value = authorAge.value =
            "";
          select.value = "Select Author";
          addAuth.style.display = "none";
          addBook.style.display = "initial";
          //scroll to new item position and slide left
          let bookList = document.querySelector(".book-list");
          let books = document.querySelectorAll(".book-li");
          books.forEach(li => {
            if (!li.classList.contains("slide-book-left")) {
              li.classList.add("slide-book-left");
            }
          });
          bookList.scrollTop = books[0].offsetTop;
        });
    }, 200);
  }

  submitForm(e) {
    if (this.props.getUserQuery.user) {
      e.preventDefault();
    }
    let authorName = document.querySelector("#first_name");
    let bookName = document.querySelector("#book_name");
    let text = authorName.nextSibling;
    let bookText = bookName.nextSibling;
    if (authorName.value.length === 0) {
      text.innerHTML = "Name cannot be blank";
      text.style.color = "red";
      return;
    }
    if (bookName.value.length === 0) {
      bookText.innerHTML = "Name cannot be blank";
      bookText.style.color = "red";
      return;
    }

    new Promise(() => showAddForms()).then(selectList("reading"));

    this.props
      .addAuthorMutation({
        variables: {
          name: authorName.value,
          age: this.state.age,
          userId: this.props.getUserQuery.user.id
        }
      })
      .then(() => this.props.getAuthorsQuery.refetch())
      .then(() => this.submitBookAlso());
  }

  render() {
    return (
      <div className="add-container" id="add-author">
        <form action="" id="add-authors" onSubmit={this.submitForm.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="first_name"
                type="text"
                className="validate"
                onChange={e => {
                  let name = document.querySelector("#first_name");
                  let text = name.nextSibling;
                  text.innerHTML = "Author Name";
                  text.style.color = "#9e9e9e";
                  this.setState({ name: e.target.value });
                }}
              />
              <label className="active" htmlFor="first_name">
                Author Name
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="age"
                type="text"
                className="validate"
                onChange={e => {
                  this.setState({ age: parseInt(e.target.value) });
                }}
              />
              <label className="active" htmlFor="age">
                Age
              </label>
            </div>
          </div>
          <div className="row center">
            <button
              id="add-book-and-author-button"
              className="btn btn-small waves-effect waves-light"
            >
              Submit Author and Book
              {/* <i className="material-icons"></i> */}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddAuthor);
