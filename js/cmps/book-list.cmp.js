import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" >
                    <book-preview :book="book"/>
                        <!-- <button @click.stop="remove(book.id)">x</button> -->
                        <router-link :to="'/book/' + book.id">Details</router-link> |
                        <router-link :to="'/book/edit/' + book.id">Edit</router-link> |
                        <button @click="remove(book.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        showDetails(book) {
            console.log('selected', book);
            this.$emit('selected', book)
        }
    },
    computed: {

    },
    components: {
        bookPreview,
    }
}



