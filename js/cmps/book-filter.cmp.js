export default {
    template: `
        <section class="book-filter">
            Filters:
            <label class="text-filter">
                <input v-model="filterBy.title" @input="filter"  type="text" placeholder="search by name">
            </label>
            <label class="text-filter">
                Min price:
                <input v-model="filterBy.fromPrice" @input="filter"  type="number" placeholder="From price">
            </label>
            <label class="text-filter">
                Max price:
                <input v-model="filterBy.toPrice"  @input="filter" class="maxPrice-filter-input" type="number" placeholder="set price">
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
    }
}