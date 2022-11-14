const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookApp from './views/book-app.cmp.js'

import bookDetails from './views/book-details.cmp.js'
import bookEditCmp from './views/book-edit.cmp.js'


import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

import userMsg from './cmps/user-msg.cmp.js'


const options = {
    template: `
        <section>
            <app-header />
            <router-view />
            <app-footer />
            <user-msg></user-msg>
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg,
    },
}

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },

        {
            path: '/about',
            component: aboutPage
        },

        {
            path: '/book',
            component: bookApp
        },

        {
            path: '/book/:id',
            component: bookDetails
        },
        
        {
            path: '/book/edit/:id?',
            component: bookEditCmp
        },
        ]
}


const app = createApp(options)
const router = createRouter(routerOptions)

app.use(router)
app.mount('#app')
