import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import {BookShelves} from './BookShelf'
import {Route} from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true ,
    books : []

  }

  componentDidMount() {
    BooksAPI.getAll().then(
        (books) => {
            this.setState({books : books})
            // console.log(this.state.books)
        }
    )
}

  handleSearchButton = () => {
    this.setState({ showSearchPage: true })
  }

  handleShelfChange = (event,book) => {
    const shelf = event.target.value
    // console.log(book)
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
          <SearchBook handleShelfChange={this.handleShelfChange}/>
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
