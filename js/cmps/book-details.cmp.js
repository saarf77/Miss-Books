export default {
    props: ['book'],
    template: `
            <section class="book-details">
                <img v-if="onSale" class="sale" src="../../img/banner.svg"/>
                <img :src="book.thumbnail"/>
                <section class="details">
                    <section class="main-details">
                        <h1 class="title">{{ book.title }}</h1>
                        <h4 class="date">{{ publishedDate }}</h4>
                        <p class="desc">{{ displayText }}
                            <span
                            @click="readMore" class="long-text">{{ isLong }}
                            </span>
                        </p>
                    </section>
                    <aside class="aside">
                        <button class="close" @click="$emit('close')"></button>
                        <section>
                        <h3>{{ pageCount }}</h3>
                        <h2 class="price" :class="isExpensive">{{ amount }}</h2>
                        </section>
                    </aside>
                </section>
            </section>
        `,
    data() {
        return {
            onSale: this.book.listPrice.isOnSale,
            price: this.book.listPrice.amount,
            isRead: false
        }
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
        isExpensive() {
            if (this.price > 150) return 'cheap'
            if (this.price < 20) return 'expensive'
        },
        displayText() {
            if (!this.isRead) {
                return this.book.description.slice(0, 100)
            } else {
                return this.book.description
            }
        },
        isLong() {
            return (this.book.description.length > 100) ? 'Read more' : 'Read less'
        },
        amount() {
            const currency = this.book.listPrice.currencyCode
            const country = this.book.language
            const amount = this.book.listPrice.amount
            return amount.toLocaleString(country, { style: 'currency', currency, minimumFractionDigits: 2 })
        },
    },

}