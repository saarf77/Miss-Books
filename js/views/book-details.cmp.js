import { bookService } from "../services/book-service.js"

import longText from '../cmps/long-text.cmp.js'

export default {
    // props: ['book'],
    template: `
            <section v-if="book" class="book-details">
            <h1 class="title">{{ book.title }}</h1>

                <section class="books-img"> 
                    <img :src="book.thumbnail"/>
                    <section v-if="book.listPrice.isOnSale"> 
                    <img  class="sale" src="img/sale1.jpg"/>
                    </section>
                </section>
                <section class="details">
                    <section class="main-details">
                        <!-- <h1 class="title">{{ book.title }}</h1> -->
                        <h4>Language: {{book.language}}</h4>
                        <h4 class="date">{{ publishedDate }}</h4>
                        <h3>Pages: {{ pageCount }}</h3>
                        <h2 class="priceStyle" >{{ amount }}</h2>
        
                    <section>
                        <p class="category">category:</p>
                        <p v-for="category in book.categories">{{ category }}</p>
                                <long-text class="long-text" :txt="book.description" :maxLength="100"/>
                                <!-- <button class="close-btn" @click="$emit('close')">Close</button> -->
                                <router-link to="/book"> <button> Back</button> </router-link>

                            </section>
                        </p>
                    </section>
                </section>
            </section>
        `,
    data() {
        return {
            // onSale: this.book.listPrice.isOnSale,
            // price: this.book.listPrice.amount,
            // isRead: false
            book: null,
            
        }
    },
    created(){
        const id = this.$route.params.id
        bookService.get(id)
            .then(book => this.book = book)
    },
    methods: {
        readMore() {
            this.isRead = !this.isRead
        }
    },
    computed: {
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
    }
}