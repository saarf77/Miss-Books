export default {
    template: `
        <form @submit.prevent="addReview">
            <label>Name:
                <input ref="input" v-model="review.fullname" type="text" placeholder="enter full name" />
            </label>
            <label>
                Rate:
                <!-- <input v-model="review.rate" type="range" min="0" max="5" /> -->
                <select v-model.number="review.rate">
                    <option v-for="n in 5" :value="n">{{n}}</option>
                </select>
            </label>
            <label>
                Date:
                <input v-model="review.date" type="date" name="" id="" />
            </label>
            <label>
                Info:
                <textarea v-model="review.info" name="" id="" cols="30" rows="5"></textarea>
            </label>
            <button >Send</button>
        </form>
    `,
    data() {
        return {
            review: { fullname: 'Books Reader', rate: 1, date: '', info: '' },
        }
    },
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
        addReview() {
            this.$emit('reviewed', {...this.review})
            this.review = { fullname: 'Books Reader', rate: 1, date: '', info: '' }
        }
    },
}
