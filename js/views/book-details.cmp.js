import { bookService } from "../services/book-service.js"
// import { eventBus } from '../services/event-bus.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


import longText from '../cmps/long-text.cmp.js'
import bookReview from "../cmps/book-review.cmp.js"
import reviewAdd from "../cmps/review-add.cmp.js"

export default {
    // props: ['book'],
    template: `
            <section v-if="book" class="book-details">
                
                <section class="books-img"> 
                    <img :src="book.thumbnail"/>
                    <section v-if="book.listPrice.isOnSale"> 
                        <img  class="sale" src="img/sale1.jpg"/>
                    </section>
                </section>
                <section class="details">

                <router-link  :to="'/book/' + prevBookId"> <button> Prev Book</button> </router-link>
                <router-link  :to="'/book/' + nextBookId"> <button> Next Book</button> </router-link>

                    <section class="main-details">
                        <h1 class="title">{{ book.title }}</h1>
                        <p v-for="author in book.authors">Author: {{ author }}</p>
                        <h4>Language: {{book.language}}</h4>
                        <h4 class="date">{{ publishedDate }}</h4>
                        <h4>Pages: {{ pageCount }}</h4>
                        <h3 class="priceStyle" >{{ amount }}</h3>

                    <section>
                        <h4 class="category">Category:  <span v-for="category in book.categories"> {{ category + ", " }}</span></h4>
                       
                                <long-text class="long-text" :txt="book.description" :maxLength="100" />
                                <review-add @reviewed="addReview"/>
                    <section class="book-reviews">
                        <ul class="review-list">
                            <li v-for="review in book.reviews" :key="review.id">
                                <book-review @removed="removeReview" :review="review"/>
                            </li>
                        </ul>
                    </section>
                                <router-link to="/book"> <button> Back</button> </router-link>
                            </section>
                        </p>
                    </section>
                </section>
            </section>
        `,
    data() {
        return {
            book: null,
            bookDesc: '',
            isLong: true,
            nextBookId: null,
            prevBookId: null,

        }
    },
    created(){
        this.loadBook()
        this.loadBook2()
        },
    methods: {
        loadBook() {
            bookService.get(this.bookId)
                .then(book => {
                    this.book = book
                    bookService.getNextBookId(book.id) 
                        .then(nextBookId => this.nextBookId = nextBookId)
                })
                
                .catch(err => showErrorMsg('Cannot load book'))
        }, 
        loadBook2() {
            bookService.get(this.bookId)
                .then(book => {
                    this.book = book
                    bookService.getPrevBookId(book.id)
                        .then(prevBookId => this.prevBookId = prevBookId)
                })
                .catch(err => showErrorMsg('Cannot load book'))
        }, 

        removeReview(id) {
            bookService.removeReview(this.book.id, id)
                .then(book => {
                    this.book = book
                        showSuccessMsg(`Review removed`)
                    })
                    .catch(err =>{
                        console.log('OOPS', err)
                        showErrorMsg('Cannot remove review')
                })
        },

        addReview(review) {
            bookService.addReview(this.book.id, review)
                .then(book => {
                    this.book = book
                    showSuccessMsg(`Review added`)
                })
                .catch(err =>{
                    console.log('OOPS', err)
                    showErrorMsg('Cannot add review')
                })

        },

        readMore() {
            this.isRead = !this.isRead
        }
    },
    computed: {
        bookId() {
            return this.$route.params.id
        },
        pageCount() {
            const pCount = this.book.pageCount
            if (pCount > 500) return 'Long Reading'
            if (pCount > 200) return 'Decent Reading'
            if (pCount > 0) return 'Light Reading'
        },
        publishedDate() {
            const date = this.book.publishedDate
            if (2022 - date > 10) return 'Veteran Book'
            if (2022 - date < 1) return 'New!'
        },

        priceStyle() {
            if (this.book.listPrice.amount > 150) return 'expensive'
            if (this.book.listPrice.amount < 20) return 'cheap'
        },
        amount() {
            const currency = this.book.listPrice.currencyCode
            const country = this.book.language
            const amount = this.book.listPrice.amount
            return amount.toLocaleString(country, { style: 'currency', currency, minimumFractionDigits: 2 })
        },
    },
    components: {
        longText,
        bookReview,
        reviewAdd,
    },
    watch: {
        bookId() {
            console.log('Book Id changed')
            this.loadBook()
            this.loadBook2()
        }
    },
}








