import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus.service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'


export default {
    template: `
    <section class="book-app">
        <book-filter @filter="filter"/>
        <router-link to="/book/edit">Add a car</router-link>
        <book-list v-if="books"
            :books="booksToShow"
            @selected="selectBook" 
            @remove="removeBook" 
        />

        <!-- <book-details 
            @close="selectedBook = null" 
             v-if="selectedBook" 
            :book="selectedBook"
        /> -->

    </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
        }
    },
    created() {
        // this.books = bookService.query()
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

                    const msg = {
                        txt: `Book ${bookId} deleted...`,
                        type: 'success',
                    }
                    eventBus.emit('user-msg', msg)
                })

        },
        selectBook(book) {
            this.selectedBook = book
        },
        // bookSaved(book) {
        //     this.books.push(book)
        // },
        filter(filterBy) {
            console.log(filterBy)
            this.filterBy = filterBy
        }
    },
    // book.listPrice.currencyCode<=this.filterBy.toPrice
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
        // bookDetails,
        bookList,
    }
}



// import { bookService } from '../services/book-service.js'

// import bookFilter from './book-filter.cmp.js'
// import bookDetails from './book-details.cmp.js'
// import bookList from './book-list.cmp.js'

// export default {
//     template: `
//     <section class="book-app">
//         <book-filter @filter="filter"/>
//         <book-list 
//             :books="booksToShow"
//             @selected="selectBook" 
//             @remove="removeBook" 
//         />

//         <book-details 
//             v-if="selectedBook" 
//             :book="selectedBook"
//             @close="selectedBook = null" 
//         />

//     </section>
//     `,
//     created() {
//         this.books = bookService.query()
//     },
//     data() {
//         return {
//             books: [],
//             selectedBook: null,
//             filterBy: null,
//         }
//     },
//     methods: {
//         removeBook(bookId) {
//             bookService.remove(bookId)

//             const idx = this.books.findIndex(book => book.id === bookId)
//             this.books.splice(idx, 1)
//         },
//         selectBook(book) {
//             this.selectedBook = book
//             window.scrollTo(0, 100000)
//         },
//         // bookSaved(book) {
//         //     this.books.push(book)
//         // },
//         filter(filterBy) {
//             console.log(filterBy)
//             this.filterBy = filterBy
//         }
//     },
//     // book.listPrice.currencyCode<=this.filterBy.toPrice
//     computed: {
//         booksToShow() {
//             if (!this.filterBy) return this.books
//             const { title, toPrice, fromPrice } = this.filterBy
//             const regex = new RegExp(title, 'i')
//             return this.books.filter(({ title, listPrice: { amount } }) => (regex.test(title))
//                 && (amount < toPrice)
//                 && (amount > fromPrice))
//         }
//     },
//     components: {
//         bookFilter,
//         bookDetails,
//         bookList,
//     }
// }