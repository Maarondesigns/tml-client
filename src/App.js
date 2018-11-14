import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//components
import ReadingList from "./components/ReadingList/ReadingList";
import TodoList from "./components/TodoList/TodoList";
import GroceryList from "./components/GroceryList/GroceryList";
import Nav from "./components/Nav";
import Home from "./components/Home/Home";

//apollo client setup
const client = new ApolloClient({
  uri: "https://mikes-reading-list.herokuapp.com/graphql",
  // uri: "http://localhost:4000/graphql",
  credentials: "include"
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Nav />
          <div id="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/readinglist" component={ReadingList} />
              <Route path="/todolist" component={TodoList} />
              <Route path="/grocerylist" component={GroceryList} />
            </Switch>
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
