import { eventBus } from '../services/event-bus.service.js'


export default {
    name: 'user-msg',
    template: `
        <section :class="msg.type" v-if="msg.txt" class="user-msg">
            <h2>{{ msg.txt }}</h2>
            <router-link v-if="msg.link" :to="msg.link">go to book</router-link>
            <button @click="closeMsg">X</button>
        </section>
    `,
    data() {
        return {
            msg: { txt: '', type: 'success', link: '' },
        }
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg)
    },
    methods: {
        showMsg(payload) {
            this.msg = payload
            setTimeout(() => this.msg.txt = '', this.msg.timeout || 5000)
        },
        closeMsg(){
            this.msg.txt = ''
        }

    },
    unmounted() {
        this.unsubscribe()
    }
}