import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import {BookShelves} from './BookShelf'
import {Route} from 'react-router-dom'
class BooksApp extends React.Component {

  state = {
    books : []

  }

  componentDidMount() {
    BooksAPI.getAll().then(
        (books) => {
            this.setState({books : books})
        }
    )
    console.log('componenet did mount')
}

  handleSearchButton = () => {
    this.setState({ showSearchPage: true })
  }

  handleShelfChange = (event,book) => {
    const shelf = event.target.value
    book.shelf = shelf
    this.setState((prevState) => ({books : prevState.books}))
    BooksAPI.update(book,shelf).then((data) => {
      BooksAPI.getAll().then(
        (books) => {
            this.setState({books : books})
        }
    )
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook handleShelfChange={this.handleShelfChange} myBooks={this.state.books}/>
        )} />
        <Route exact path='/' render={() => (
          <BookShelves searchHandler={this.handleSearchButton}
            books={this.state.books} handleShelfChange={this.handleShelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp
