const { createRouter, createWebHashHistory } = VueRouter

import bookApp from "../views/book-app.cmp.js"
import homePage from "../views/home-page.cmp.js"
import aboutPage from "../views/about-page.cmp.js"
import bookDetails from "../views/book-details.cmp.js"
import bookEditCmp from "../views/book-edit.cmp.js"
import aboutTeam from "../views/about-team.cmp.js"
import aboutGoals from "../views/about-goals.cmp.js"


const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },

        {
            path: '/about',
            component: aboutPage,
            children: [
                {
                    path: 'team',
                    component: aboutTeam,
                },                
                {
                    path: 'goals',
                    component: aboutGoals,
                },                
            ]
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


export const router = createRouter(routerOptions)
