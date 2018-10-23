import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../../queries/bookqueries";
import amazonLogo from "../../img/amazon-logo_grey.png";

class BookDetails extends Component {
  splitGenres(book) {
    return book.genre.map((genre, index) => {
      return <li key={"genre" + index}>{genre}</li>;
    });
  }

  showAmazonLink() {
    let amazonDisplay = document.getElementById("amazon");
    console.log(amazonDisplay.style.display);
    if (amazonDisplay.style.display !== "none") {
      amazonDisplay.style.display = "none";
    } else {
      amazonDisplay.style.display = "initial";
    }
    console.log(amazonDisplay.style.display);
  }

  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          {/* <h5 onClick={this.showAmazonLink} onMouseOver={this.showAmazonLink}> */}
          <h5>
            {book.name} <i className="tiny material-icons">launch</i>
          </h5>
          <a
            id="amazon"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.amazon.com/gp/search?ie=UTF8&tag=toomanylists-20&linkCode=ur2&&index=books&keywords=${
              book.name
            }`}
          >
            <img
              src={amazonLogo}
              alt="Amazon Logo"
              style={{ height: "40px" }}
            />
          </a>
          <p>Genre(s):</p>
          <ul>{this.splitGenres(book)}</ul>
          <p>
            Author: <strong>{book.author.name}</strong>
          </p>
          <p>Other books by this author:</p>
          <ul className="other-books">
            {book.author.books.filter(item => item.id !== book.id).map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected.</div>;
    }
  }

  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
