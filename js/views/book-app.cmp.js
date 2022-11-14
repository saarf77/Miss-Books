import { bookService } from '../services/book-service.js'
// import { eventBus } from '../services/event-bus.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookAdd from "../cmps/book-add.cmp.js"


export default {
    template: `
    <section class="book-app">
        <book-filter @filter="filter"/>
         <!-- <router-link to="/book/edit">Add a car</router-link> -->

         <book-add @added="add"/>

        <book-list v-if="books"
            :books="booksToShow"
            @selected="selectBook" 
            @remove="removeBook" 
        />

    </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
            minPrice: 0,
            googleBooks: null,

        }
    },
    created() {
        bookService.query()
            .then(books => {
                console.log(books);
                this.books = books
            })
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    showSuccessMsg(`Book ${bookId} deleted`)
                })
                .catch(err =>{
                    console.log('OOPS', err)
                    showErrorMsg('Cannot remove Book')
                })

        },
        selectBook(book) {
            this.selectedBook = book
        },

        filter(filterBy) {
            console.log(filterBy)
            this.filterBy = filterBy
        },
        add(book) {
            this.books.unshift(book)
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const { title, toPrice, fromPrice } = this.filterBy
            const regex = new RegExp(title, 'i')
            return this.books.filter(({ title, listPrice: { amount } }) => (regex.test(title))
                && (amount < toPrice)
                && (amount > fromPrice))
        }
    },
    components: {
        bookFilter,
        bookList,
        bookAdd,
    }
}



