export default {
    template: `
        <section class="book-filter">
            <input 
                @input="filter"
                v-model="filterBy.title" 
                type="text" 
                placeholder="Search">
        </section>
    `,
    data(){
        return { 
            filterBy: {
                title: '',
            }
        }
    },
    methods : {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}