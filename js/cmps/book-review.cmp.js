export default {
    name: 'book-review',
    props: ['review'],
    emits: ['removed'],
    template:`
                <section>
                    <h5>{{ review.fullname }}</h5>
                    <h6>{{ review.date }}</h6>
                </section>
                <section class="comment">
                    <p>"{{ review.info }}"</p>
                    <h6>{{ review.rate }}</h6>
                    <button @click="remove">X</button>
                </section>
    `,
    data(){
        return{

        }
    },
    methods: {
        remove(){
            this.$emit('removed',this.review.id)
        }
    },
    computed: {

    },
}