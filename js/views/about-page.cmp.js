import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="about-page">
            <h1 class="about-title">About us</h1>
            <p> <strong> Miss Books </strong> is a unique cultural institution, with the heart of a local
                 bookstore and the soul of an agent of intellectual and social change. 
                 While we are firm believers in the vital role of human-scale bookstores in encouraging 
                 meaningful literacy, we are also dedicated to expanding our activity beyond the store 
                 borders and contributing to the development of literary, cultural and social values of 
                 inclusion, dialogue, and the celebration of creativity, both locally and worldwide. 
            </p>
            <p>Since 2004, Miss Books is the publisher of Granta Hebrew, 
                one of the international edition of the beloved and well-established 
                literature magazine of Granta - New Writing. 
            </p>
            <button @click="emit">Emit event</button>
        </section>
    `,
    methods: {
        emit() {
            eventBus.emit('user-msg', { num: 1234, txt: 'baba' })
            // eventBus.emit('user-msg', {num: 1234, txt: 'baba'})

        }
    }
}