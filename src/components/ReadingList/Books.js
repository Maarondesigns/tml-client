import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//queries
import {
  getBooksQuery,
  getAuthorsQuery,
  removeBookMutation,
  removeAuthorMutation,
  updateBookMutation
} from "../../queries/bookqueries";
import { getUserQuery } from "../../queries/userqueries";

//components
import BookDetails from "./BookDetails";
import DisplayListItems from "../Reusable/DisplayListItems";

//functions
import { selectThis } from "../util_functions/selectThis";
import { selectList } from "../util_functions/selectList";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      books: null,
      timeouts: [],
      filter: null,
      updating: false
    };
    this.selectItem = this.selectItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ selected: this.props.selected });
  }

  selectItem(e, item) {
    let parent = e.target.parentNode;
    this.setState({ selected: item.id, updating: false });
    selectThis(parent);
  }
  editItem(e, item) {
    let parent = e.target.parentNode;
    this.setState({ selected: item.id, updating: true });
    selectThis(parent);
  }

  filterByGenre() {
    let data = this.props.getBooksQuery;
    if (data.loading === false && data.books) {
      let bookGenres = [];
      data.books.forEach(book => {
        book.genre.forEach(genre => {
          if (bookGenres.indexOf(genre) === -1) {
            bookGenres.push(genre);
          }
        });
      });
      return (
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
      books.sort((a, b) => a.order - b.order);
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
    document.querySelectorAll(".book-li").forEach(li => {
      this.props.updateBookMutation({
        variables: {
          id: li.id,
          order: +li.getAttribute("data-order")
        }
      });
    });
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  componentDidUpdate() {
    let q = this.props.getBooksQuery;
    let user = this.props.getUserQuery.user;
    if (q.loading === true || !user) {
      return;
    } else {
      if (this.state.books === null) {
        this.setState({ books: q.books });
      } else {
        if (q.books !== this.state.books) {
          this.setState({ books: q.books });
        }
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
          <ul className="book-list">
            {this.filterByGenre()}
            <DisplayListItems
              data={this.props.getBooksQuery}
              mutation={this.props.updateBookMutation}
              user={this.props.getUserQuery.user}
              type={"books"}
              filter={this.state.filter}
              selectItem={this.selectItem}
              editItem={this.editItem}
              removeItem={this.props.removeBookMutation}
            />
          </ul>
          <BookDetails bookId={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(removeBookMutation, { name: "removeBookMutation" }),
  graphql(removeAuthorMutation, { name: "removeAuthorMutation" }),
  graphql(updateBookMutation, { name: "updateBookMutation" })
)(Books);
