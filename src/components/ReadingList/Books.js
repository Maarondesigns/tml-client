import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getBooksQuery,
  getAuthorsQuery,
  removeBookMutation,
  removeAuthorMutation,
  updateBookMutation
} from "../../queries/bookqueries";

//components
import BookDetails from "./BookDetails";

//functions
import { selectThis } from "../util_functions/selectThis";
import { selectList } from "../util_functions/selectList";
import CompleteItem from "../Reusable/CompletedButton";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      books: [],
      timeouts: [],
      filter: null
    };
  }

  componentWillReceiveProps() {
    this.setState({ selected: this.props.selected });
  }

  displayBooks() {
    let data = this.props.getBooksQuery;
    if (data.loading === true) {
      return <div>Loading Books...</div>;
    } else {
      let bookGenres = [];
      data.books.forEach(book => {
        book.genre.forEach(genre => {
          if (bookGenres.indexOf(genre) === -1) {
            bookGenres.push(genre);
          }
        });
      });
      let books = data.books.filter(x => x.completed !== true);
      let completedBooks = data.books.filter(x => x.completed === true);

      return (
        <div>
          <div id="filter-by-genre">
            <select
              className="browser-default"
              defaultValue="Filter By Genre"
              onChange={e => {
                let val = e.target.value;
                if (val === "All Books") {
                  this.setState({ filter: null });
                  this.slideBookLeft();
                } else {
                  let bookFilter = data.books.filter(book => {
                    return book.genre.indexOf(val) !== -1;
                  });
                  this.setState({ filter: bookFilter });
                  this.slideBookLeft();
                }
              }}
            >
              <option value="Filter By Genre" disabled>
                Filter by Genre
              </option>
              <option>All Books</option>
              {bookGenres.map(genre => {
                return <option key={genre}>{genre}</option>;
              })}
            </select>
          </div>
          {books.map(book => {
            //CREATE LIST ITEMS FOR ALL BOOKS NOT YET COMPLETED
            if (
              this.state.filter === null ||
              this.state.filter.indexOf(book) !== -1
            ) {
              let fontSize = { fontSize: "1.5rem" };
              return (
                <li className="book-li" id={book.id} key={book.id}>
                  <CompleteItem
                    buttonId={"delete-book"}
                    buttonSymbol={"check"}
                    id={book.id}
                    thisQuery={data}
                    thisMutation={this.props.updateBookMutation}
                  />
                  <div
                    className="booklist-text truncate"
                    onClick={e => {
                      let parent = e.target.parentNode;
                      this.setState({ selected: book.id });
                      selectThis(parent);
                    }}
                  >
                    {book.name}
                  </div>
                </li>
              );
            } else return <li />;
          })}
          {completedBooks.map(book => {
            // LIST ITEMS FOR ALL COMPLETED BOOKS
            if (
              this.state.filter === null ||
              this.state.filter.indexOf(book) !== -1
            ) {
              let fontSize = { fontSize: "1.5rem" };
              return (
                <li className="book-li" id={book.id} key={book.id}>
                  <button
                    id="delete-book"
                    onClick={e => {
                      this.setState({ books: this.props.getBooksQuery.books });
                      this.removeBook(book.id, e.target);
                    }}
                  >
                    <i className="material-icons" style={fontSize}>
                      delete
                    </i>
                  </button>
                  <div
                    className="booklist-text truncate completed"
                    onClick={e => {
                      let parent = e.target.parentNode;
                      this.setState({ selected: book.id });
                      selectThis(parent);
                    }}
                  >
                    {book.name}
                  </div>
                  <CompleteItem
                    buttonId={"edit-item"}
                    buttonSymbol={"arrow_upward"}
                    id={book.id}
                    thisQuery={data}
                    thisMutation={this.props.updateBookMutation}
                  />
                </li>
              );
            } else return <li />;
          })}
        </div>
      );
    }
  }
  slideBookLeft() {
    let timeouts = [];
    this.props.getBooksQuery.refetch().then(data => {
      let { books } = data.data;
      if (this.state.filter !== null) {
        books = this.state.filter;
      }
      books.forEach((book, index) => {
        let el = document.getElementById(book.id);
        timeouts.push(
          setTimeout(() => {
            if (el) {
              el.classList.add("slide-book-left");
            }
          }, 100 * index)
        );
      });
      this.setState({ timeouts: [...this.state.timeouts, timeouts] });
    });
  }
  componentDidMount() {
    this.slideBookLeft();
  }

  componentWillUnmount() {
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  componentDidUpdate() {
    let q = this.props.getBooksQuery;
    if (q.loading === true) {
      return;
    } else {
      let previousAuthors = this.state.books.map(book => book.author.name);
      let newAuthors = q.books.map(book => book.author.name);
      let authorRemoved = previousAuthors.filter(
        author => newAuthors.indexOf(author) === -1
      );
      if (authorRemoved.length) {
        let author = this.props.getAuthorsQuery.authors.filter(
          author => author.name === authorRemoved[0]
        );
        if (author.length) {
          this.props.removeAuthorMutation({
            variables: {
              id: author[0].id
            },
            refetchQueries: [
              {
                query: getAuthorsQuery
              }
            ]
          });
        }
      }
    }
  }

  removeBook(book, button) {
    button.classList.add("delete-button-clicked");
    setTimeout(() => {
      this.props.removeBookMutation({
        variables: {
          id: book
        },
        refetchQueries: [
          {
            query: getBooksQuery,
            variables: {
              awaitRefetchQueries: true
            }
          }
        ]
      });
      this.setState({ selected: null });
    }, 1500);
  }

  render() {
    return (
      <div>
        <h4
          onClick={() => {
            this.setState({ selected: null });
            selectList("reading");
          }}
        >
          READING LIST
        </h4>
        <div id="books-and-details">
          <ul className="book-list">{this.displayBooks()}</ul>
          <BookDetails bookId={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(removeBookMutation, { name: "removeBookMutation" }),
  graphql(removeAuthorMutation, { name: "removeAuthorMutation" }),
  graphql(updateBookMutation, { name: "updateBookMutation" })
)(Books);
