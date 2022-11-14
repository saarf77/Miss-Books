// import { eventBus } from '../services/event-bus.service.js'

// const cmp1 = {
//     template: `
//     <section class="cmp1">
//         <h2>CMP1</h2>
//         <button @click="report">Go</button>
//     </section>
//     `,
//     methods: {
//         report() {
//             this.$emit('action', 'Go')
//         }
//     }
// }
// const cmp2 = {
//     template: `
//     <section class="cmp2">
//         <h2>CMP2</h2>
//         <button @click="report">Do</button>
//     </section>
//     `,
//     methods: {
//         report() {
//             this.$emit('action', 'Do')
//         }
//     }
// }


export default {
    template: `
        <section class="about-page">
            <h1 class="about-title">About us</h1>
            <nav>
                <router-link to="/about/team">Team</router-link> |
                <router-link to="/about/goals">Goals</router-link> |
                <router-view></router-view>
            </nav>
            <hr />
            <!-- <select v-model="cmpType">
                <option>cmp1</option>
                <option>cmp2</option>
            </select>
            <component :is="cmpType" @action="handleAction">
            </component>
            <hr />
            <component v-for="cmpType in pageCmps" :is="cmpType" @action="handleAction">
            </component> -->

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
        </section>
    `,
    data(){
        return{
            interval: null,
            // cmpType: 'cmp1',
            // pageCmps: ['cmp1', 'cmp2']
        }
    },
    unmounted() {
        console.log('AboutPage Going Down!')
    },
    methods: {
  
        handleAction(ev) {
            console.log('Parenting is handling the action!', ev)
        },
    },
    components: {
        // cmp1,
        // cmp2
    },
}