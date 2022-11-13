export default {
    props: ['book'],
    template: `
        <section class="book-preview">
        <img :src="book.thumbnail" alt="" />
            <h2>{{ book.title }}</h2>
            <h3>{{ amount }}</h3>
        </section>
    `,
    computed: {
        amount() {
            const currency = this.book.listPrice.currencyCode
            const country = this.book.language
            const amount = this.book.listPrice.amount
            return amount.toLocaleString(country, { style: 'currency', currency, minimumFractionDigits: 2 })
        },
    }
}