import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import M from "materialize-css";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../../queries/bookqueries";
import { getUserQuery } from "../../queries/userqueries";

//functions
import { selectList } from "../util_functions/selectList";
import { showAddForms } from "../util_functions/showAddForms";
import { showAddFormTwice } from "../util_functions/showAddFormTwice";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  componentDidMount() {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }
  componentDidUpdate() {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }

  displayAuthors() {
    let data = this.props.getAuthorsQuery;

    if (data.loading === true) {
      return <option disabled>Authors loading...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    let name = document.querySelector("#book_name");
    let text = name.nextSibling;
    if (name.value.length === 0) {
      text.innerHTML = "Name cannot be blank";
      text.style.color = "red";
      return;
    }

    new Promise(() => showAddForms()).then(selectList("reading"));

    this.props
      .addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId,
          userId: this.props.getUserQuery.user.id
        }
      })
      .then(() => this.props.getBooksQuery.refetch())
      .then(data => {
        //return label to normal
        text.innerHTML = "Book Name";
        text.style.color = "#9e9e9e";
        //clear form field values
        let genre = document.getElementById("genre");
        let select = document.querySelector("select");
        name.value = genre.value = "";
        select.value = "Select Author";
        //scroll to new item position and slide left
        let bookList = document.querySelector(".book-list");
        let newList = data.data.books;
        let newBook = document.getElementById(newList[newList.length - 1].id);
        bookList.scrollTop = newBook.offsetTop;
        newBook.classList.add("slide-book-left");
      });
  }

  render() {
    return (
      <div className="add-container">
        <form action="" id="add-books" onSubmit={this.submitForm.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="book_name"
                type="text"
                className="validate"
                onChange={e => {
                  let name = document.querySelector("#book_name");
                  let text = name.nextSibling;
                  text.innerHTML = "Book Name";
                  text.style.color = "#9e9e9e";
                  this.setState({ name: e.target.value });
                }}
              />
              <label className="active" htmlFor="book_name">
                Book Name
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="genre"
                type="text"
                className="validate"
                onChange={e =>
                  this.setState({
                    genre: e.target.value.split(",").map(x => x.trim())
                  })
                }
              />
              <label className="active" htmlFor="genre">
                Genres (comma separated)
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col m8 s12">
              <select
                defaultValue="Select Author"
                className="browser-default"
                onChange={e => {
                  let val = e.target.value;
                  let addAuth = document.getElementById("add-author");
                  let addBook = document.getElementById("add-book-button");
                  if (val === "Add New Author") {
                    addAuth.style.display = "initial";
                    addBook.style.display = "none";
                    if (window.innerWidth < 500) {
                      showAddFormTwice();
                    }
                  } else {
                    addAuth.style.display = "none";
                    addBook.style.display = "initial";
                    this.setState({ authorId: val });
                  }
                }}
              >
                <option value="Select Author" disabled>
                  Select Author
                </option>
                {this.displayAuthors()}
                <option>Add New Author</option>
              </select>
            </div>
            <div className="row">
              <button
                id="add-book-button"
                className="btn btn-small waves-effect waves-light col m4 s12"
              >
                + Book
              </button>
            </div>
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
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
