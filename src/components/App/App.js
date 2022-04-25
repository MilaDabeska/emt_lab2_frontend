import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Books from "../Books/BookList/books";
import Categories from "../Categories/categories"
import Authors from "../Authors/authors"
import Header from "../Header/header"
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import "bootstrap/dist/css/bootstrap.min.css"
import EShopService from "../../repository/libraryRepository";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }

    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">

                        <Route path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}/>
                        <Route path={"/authors"} exact render={() =>
                            <Authors authors={this.state.authors}/>}/>
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd categories={this.state.categories}
                                     authors={this.state.authors}
                                     onAddBook={this.addBook}/>}/>

                        <Route path={"/products/edit/:id"} exact render={() =>
                            <BookEdit categories={this.state.categories}
                                      authors={this.state.authors}
                                      onEditBook={this.editBook}
                                      product={this.state.selectedBook}/>}/>

                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books} onDelete={this.deleteBook}
                                   onTake={this.takeBook}
                                   onEdit={this.getBook}/>}/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }


    loadBooks = () => {
        BooksService.fetchBooks()
            .then((data) =>{
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        BooksService.fetchCategories()
            .then((data) =>{
                this.setState({
                    categories: data.data
                })
            });
    }
    loadAuthors = () => {
        BooksService.fetchAuthors()
            .then((data) =>{
                this.setState({
                    authors: data.data
                })
            });
    }
    addBook = (name, category,authorId,availableCopies) => {
        BooksService.addBook(name,category,authorId,availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    deleteBook = (id) => {
        BooksService.deleteBook(id)
            .then(()=>{
                this.loadBooks()
            });
    }
    takeBook = (id) =>{
        BooksService.takeBook(id)
            .then(()=>{
                this.loadBooks()
            })
    }

    getBook = (id) => {
        BooksService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id,name,category,authorId,availableCopies) => {
        BooksService.editBook(id,name,category,authorId,availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }


    componentDidMount() {
        this.loadBooks()
        this.loadCategories()
        this.loadAuthors()
    }
}

export default App;