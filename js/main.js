const { createApp } = Vue

import bookApp from './cmps/book-app.cmp.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

const options = {
    template: `
        <section>
            <app-header />
            <book-app />
            <app-footer />
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
    }
}

const app = createApp(options)

app.mount('#app')
