import React from 'react'
import { BookItems } from './BookShelf';
import * as BookApi from './BooksAPI'
import {Link} from 'react-router-dom'

class SearchBook extends React.Component {

    state = {
        searchQuery: '',
        searchedBooks: []
    }

    handleSearchInput = (event) => {
        var input = event.target.value
        this.setState({ searchQuery: input })
        clearTimeout(this.timer)
        this.timer = setTimeout(this.serachApi, 5000)
    }

    serachApi = () => {
        BookApi.search(this.state.searchQuery).then((books) => {
            if(Array.isArray(books)) {
                const filteredData = books.filter(item => {
                    return item.imageLinks    
                }).map((item) => {
                    item.shelf = ''
                    return item
                })
                console.log(filteredData)
                this.setState({searchedBooks : filteredData})
            } else {
                window.alert("No result Found")
            }
            
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={'/'}>Close</Link>
                    <SearchBar handleSearchInput={this.handleSearchInput} />
                </div>
                <SearchResults searchedBooks={this.state.searchedBooks}/>
            </div>
        )
    }
}

function SearchResults(props) {
    return (
        <div className="search-books-results">
            <ol className="books-grid"><BookItems books={props.searchedBooks}
                handleShelfChange={props.handleShelfChange} /></ol>
        </div>
    )
}

function SearchBar(props) {
    return (
        <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={props.handleSearchInput} />
        </div>
    )
}


export default SearchBook;