import React from 'react'
import { BookItems } from './BookShelf';
import * as BookApi from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBook extends React.Component {

    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        handleShelfChange: PropTypes.func.isRequired,
    }

    state = {
        searchQuery: '',
        searchedBooks: [],
        shelfValue: ''
    }

    handleSearchInput = (event) => {
        var input = event.target.value
        this.setState({ searchQuery: input })
        clearTimeout(this.timer)
        this.timer = setTimeout(this.serachApi, 500)
    }

    serachApi = () => {
        const { myBooks } = this.props
        if (this.state.searchQuery !== '') {
            BookApi.search(this.state.searchQuery).then((books) => {
                if (Array.isArray(books)) { //If we get array of books
                    
                    /*Here I am filtering out books without thumbnails and authors
                    Other than that I am also comparing my current shelf books with
                    searched books so that user can add them to their shelf or user
                    can manage shelf of their current books in searched results*/

                    const filteredData = books.filter(item => {
                        return  item.imageLinks
                    }).map((item) => {
                        item.shelf = 'none'
                        myBooks.forEach((book) => {
                            if (book.id === item.id) {
                                item.shelf = book.shelf
                            }
                        })
                        return item
                    })
                    this.setState({ searchedBooks: filteredData })
                } else { //If we do not get array of books
                    window.alert("No result Found")
                }
            })
        } else {
            this.setState({ searchedBooks: [] })
        }

    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <BackLink />
                    <SearchBar handleSearchInput={this.handleSearchInput} />
                </div>
                <SearchResults searchedBooks={this.state.searchedBooks} handleShelfChange={this.props.handleShelfChange} />
            </div>
        )
    }
}

function BackLink(props) {
    return (
        <Link className="close-search" to={'/'}>Close</Link>
    )
}
function SearchResults(props) {
    return (
        <div className="search-books-results">
            <ol className="books-grid"><BookItems handleShelfChange={props.handleShelfChange} books={props.searchedBooks} /></ol>
        </div>
    )
}

function SearchBar(props) {
    return (
        <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={props.handleSearchInput} autoFocus />
        </div>
    )
}

export default SearchBook;