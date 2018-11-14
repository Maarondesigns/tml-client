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
import { fixAddFormHeight } from "../util_functions/fixAddFormHeight";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
      book_autofill: []
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
    let user = this.props.getUserQuery.user;
    if (data.loading === true || !user) {
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
    if (this.props.getUserQuery.user) {
      e.preventDefault();
    }
    if (!this.state.authorId) {
      alert("Select Author");
      return;
    }
    let name = document.getElementById("book_name");
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
        let books = document.querySelectorAll(".book-li");
        books.forEach(li => {
          if (!li.classList.contains("slide-book-left")) {
            li.classList.add("slide-book-left");
          }
        });
        bookList.scrollTop = books[0].offsetTop;
      });
  }

  //search openlibrary for book on input and return 5 results, then set state autofill array
  searchOpenLibrary(value) {
    if (value.length > 3) {
      let that = this;
      document.getElementById("book-autofill").style.display = "block";
      fetch(
        `https://openlibrary.org/search.json?q=title:${value}&limit=5&mode=ebooks`
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          that.setState({
            book_autofill: []
          });
          myJson.docs.forEach(doc => {
            let book = {};
            if (doc.author_name) {
              book["author"] = doc.author_name[0];
            }
            if (doc.title) {
              book["title"] = doc.title;
            }
            if (doc.cover_i) {
              book["thumbnail"] = `https://covers.openlibrary.org/b/id/${
                doc.cover_i
              }-S.jpg`;
              book["cover"] = `https://covers.openlibrary.org/b/id/${
                doc.cover_i
              }-M.jpg`;
            }
            that.setState({
              book_autofill: [...that.state.book_autofill, book]
            });
          });
        });
    }
  }

  //map the openlibrary results to autofill div
  bookAutofill() {
    return this.state.book_autofill.map(book => {
      return (
        <div
          className="book-autofill"
          onClick={() => this.fillInInfo(book.title, book.author)}
        >
          <img src={book.thumbnail} />
          <div>
            <div>{book.title}</div>
            <div>by {book.author}</div>
          </div>
        </div>
      );
    });
  }

  //hide autofill, set book name and author select when book is selected
  fillInInfo(title, author) {
    document.getElementById("book-autofill").style.display = "none";
    document.getElementById("book_name").value = title;
    this.setState({ name: title });
    let select = document.getElementById("author-select");
    let { authors } = this.props.getAuthorsQuery;
    let names = authors.map(x => x.name);
    if (names.indexOf(author) === -1) {
      select.value = "Add New Author";
      this.setAuthor("Add New Author");
      setTimeout(() => {
        document.getElementById("first_name").value = author;
      }, 1000);
    } else {
      let id = authors.filter(x => x.name === author)[0].id;
      select.value = id;
      this.setAuthor(id);
    }
  }

  //activate add new author and fill in author first name if its not on list
  setAuthor(val) {
    let addAuth = document.getElementById("add-author");
    let addBook = document.getElementById("add-book-button");
    if (val === "Add New Author") {
      addAuth.style.display = "initial";
      addBook.style.display = "none";
      showAddFormTwice();
    } else {
      addAuth.style.display = "none";
      addBook.style.display = "initial";
      this.setState({ authorId: val });
    }
  }

  componentDidUpdate() {
    fixAddFormHeight();
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
                  this.searchOpenLibrary(e.target.value);
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
            <div id="book-autofill" style={{ display: "none" }}>
              {this.bookAutofill()}
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
                id="author-select"
                onChange={e => {
                  this.setAuthor(e.target.value);
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
