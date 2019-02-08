import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import { BookShelves } from './BookShelf'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {
        this.setState({ books: books })
      }
    )
  }

  handleShelfChange = (event, book) => {
    const shelf = event.target.value
    book.shelf = shelf
    setTimeout(this.setState((prevState) => ({ books: prevState.books })) , 1000)
    BooksAPI.update(book, shelf).then((data) => {
      BooksAPI.getAll().then(
        (books) => {
          this.setState({ books: books })
        }
      )
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook handleShelfChange={this.handleShelfChange}
            myBooks={this.state.books} />
        )} />
        <Route exact path='/' render={() => (
          <BookShelves books={this.state.books}
            handleShelfChange={this.handleShelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp
