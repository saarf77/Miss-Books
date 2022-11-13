import { bookService } from '../services/book-service.js'

import bookDetails from './book-details.cmp.js'
import bookList from './book-list.cmp.js'
import bookFilter from './book-filter.cmp.js'
// import bookEdit from './book-edit.cmp.js'

export default {

    template: `
    <section class="book-app">
        <book-filter @filtered="setFilter"/>
        <book-list 
        :books="booksToShow"
            @selected="selectBook"
            @remove="removeBook"
            @readBook="onReadBook"
            />

        <book-details 
        :book="selectedBook"
        v-if="selectedBook" 
        @close="selectedBook = null"/> 

        <!-- <book-edit @saved="bookSaved"/> -->
    </section>
    `,
    created() {
        // this.books = bookService.query()
    },
    data(){
        return { 
            books: bookService.query(),
            // books:[],
            selectedBook: null,
            filterBy: {},
        }
    },
    methods: {
        removebook(bookId){
            bookService.remove(bookId)
            const idx = this.books.findIndex(book => book.id === bookId)
            this.books.splice(idx, 1)
        },
        selectbook(book){
            this.selectedBook = book
        },
        bookSaved(book){
            this.books.push(book)
        },
        filter(filterBy){
            console.log(filterBy);
            this.filterBy = filterBy
        },
        // onReadBook(book) {
        //     this.bookSelected = book
        // },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => regex.test(book.title))
                &&(book.listPrice.amount< this.filterBy.toPrice)
                &&(book.listPrice.amount> this.filterBy.toPrice)
        }
    },
    components: {
        bookFilter: bookFilter,
        bookDetails: bookDetails,
        bookList: bookList,
        // bookEdit,
    }
}

