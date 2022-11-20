import { bookService } from '../services/book-service.js'

export default {
    template: `
          <section class="add-container">
                <form @submit.prevent="search" class="google-form">
                <label>
                    <h1>Search</h1>
                    <input v-model="txt" type="text" placeholder="Search for books"/>
                </label>
                <button class="search-btn">Search</button>
                </form>

                <ul class="google-books-list" v-if="googleBooks">
                    <li v-for="book in googleBooks">
                        <h2>{{ book.title }}</h2>
                        <button @click="add(book.id)" class="add-book-btn">+</button>
                    </li>
                    
                </ul>

            </section>  
        `,
    data() {
        return {
            txt: null,
            googleBooks: null
        }
    },
    methods: {
        add(bookId) {
            bookService.getGoogleBook(bookId)
                .then(book => {
                    bookService.add(book)
                    this.$emit('added', book)
                })
        },
        search() {
            bookService.getGoogleBooks(this.txt)
                .then(books => this.googleBooks = books)
        }
    },
}