const { createApp } = Vue
import { router } from "./router/router.js"

import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

import userMsg from './cmps/user-msg.cmp.js'

const main = {
    template: `
        <section>
            <app-header />
            <router-view />
            <app-footer />
            <user-msg />
        </section>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg,
    },
}

const app = createApp(main)

app.use(router)
app.mount('#app')
