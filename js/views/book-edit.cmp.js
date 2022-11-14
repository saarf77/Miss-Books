import { bookService as bookService } from "../services/book-service.js"
// import { eventBus } from "../services/event-bus.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export default {
    template: `
        <section class="book-edit">
            <h1>Book Edit</h1>
            <form @submit.prevent="save">
                <input ref="title" type="text" v-model="bookToEdit.title">
                <input type="number" v-model.number="bookToEdit.listPrice.amount">
                <button ref="btn">Save</button>
            </form>
        </section>
    `,
    data() {
        return { 
            bookToEdit: null,
        }
    },
    created(){
        const bookId = this.$route.params.id
        if(bookId){
            bookService.get(bookId)
                .then(book => this.bookToEdit = book)
        } else {
            this.bookToEdit = bookService._createBook
        }
    },
    mounted(){
        this.$refs.title.focus()
        console.log(this.$refs.btn);
    },
    methods:{
        save(){
            // const car = carService.save(this.carToEdit)
            // this.$emit('saved', car)
            // this.carToEdit = carService.getEmptyCar()
            bookService.save(this.bookToEdit)
                .then(book => {
                    showSuccessMsg(`Book saved (book id: ${book.id})`)
                    this.$router.push('/book')
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot save book`)
                })
        }
    }
}