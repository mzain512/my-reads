import React from 'react'
// import * as BooksApi from './BooksAPI'
import {Link} from 'react-router-dom'

export function BookShelves(props) {

    return (
        <div className="list-books">
            <MyReads />
            <div className="list-books-content">
                <div>
                    <CurrentlyReading books={props.books} handleShelfChange={props.handleShelfChange} />
                    <WantToRead books={props.books} handleShelfChange={props.handleShelfChange}/>
                    <Read books={props.books} handleShelfChange={props.handleShelfChange}/>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search' className='open-search'>Add a book</Link>
            </div>
        </div>
    )
}


function MyReads(props) {
    return (
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
    )
}

function CurrentlyReading(props) {
    const currentlyReading = props.books.filter(
        book => book.shelf === 'currentlyReading'
    )

    return (
        <div className="bookshelf">
            <ShelfName shelfName={'Currently Reading'} />
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <BookItems books={currentlyReading} handleShelfChange={props.handleShelfChange}/>
                </ol>
            </div>
        </div>
    )
}

function WantToRead(props) {

    const wantToRead = props.books.filter(
        book => book.shelf === 'wantToRead'
    )

    return (
        <div className="bookshelf">
            <ShelfName shelfName={'Want To Read'} />
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <BookItems books={wantToRead} handleShelfChange={props.handleShelfChange}/>
                </ol>
            </div>
        </div>
    )
}

function Read(props) {

    const read = props.books.filter(
        book => book.shelf === 'read'
    )


    return (
        <div className="bookshelf">
            <ShelfName shelfName={'Read'} />
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <BookItems books={read} handleShelfChange={props.handleShelfChange}/>
                </ol>
            </div>
        </div>
    )
}

function ShelfChanger(props) {
    return (
        <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={(event) => {props.handleShelfChange(event , props.book)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

function ShelfName(props) {
    return (
        <h2 className="bookshelf-title">{props.shelfName}</h2>
    )
}

export function BookItems(props) {
    const items = props.books.map((book) =>
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    {console.log('url(' + book.imageLinks.thumbnail + ')')}
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                    <ShelfChanger handleShelfChange={props.handleShelfChange} book={book}/>
                </div>
                <div className="book-title">{book.title}</div>
                <AuthorsList authors={book.authors} />
            </div>
        </li>
    )
    return (
        items
    )
}

function AuthorsList(props) {
    const authorsList = props.authors.map(author => <div key={author}>{author}</div>)
    return (
        <div className="book-authors">{authorsList}</div>
    )
}

// export default BookShelves;