

export default {
    template: `
        <section class="book-filter">
            <label class="text-filter">
                <h1> Filter</h1>  
                <input v-model="filterBy.title" @input="filter"  type="text" placeholder="Filter by name">
            </label>
            <label>
                    Min Price:
                    <input type="range" @input="filter" v-model.number="filterBy.fromPrice"
                        min="0" max="200" />
                        <span>{{filterBy.fromPrice}}</span>
                </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: Infinity,
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', { ...this.filterBy })
        }
    },
    watch: {
        filterBy:{
            handler(){
                console.log('Something changed')
            },
            deep: true
        }
    }
}