import bookPreview from './book-preview.cmp.js'

export default {
    props:['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <book-preview :book="book"/>
                    <section class="actions">
                        <button @click="showDetails(book)">Details</button>
                        <!-- <button @click="remove(book.id)">x</button> -->
                    </section>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {  
        }
    },
    methods: {
        // remove(bookId){
        //     this.$emit('remove', bookId)
        // },
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



