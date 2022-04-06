import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/user",
        component: () =>
            import ("../components/HomeWel.vue"),
        name: "User",
        redirect: "/wel",
        children: [{
                path: "/wel",
                component: () =>
                    import ("../components/myWelcom.vue"),
            },
            {
                path: "/1-2",
                component: () =>
                    import ("../components/myWelcom.vue"),
            },
            {
                path: "/edit",
                component: () =>
                    import ("../views/doEdit.vue"),
            },
            {
                path: "/adminpost",
                component: () =>
                    import ("../views/adminPost.vue"),
            },
            {
                path: "/1-5",
                component: () =>
                    import ("../components/myWelcom.vue"),
            },
            {
                path: "/aboutme",
                component: () =>
                    import ("../views/aboutMyblog.vue"),
            },
            {
                path: "/1-7",
                component: () =>
                    import ("../components/myWelcom.vue"),
            },
            {
                path: "/1-8",
                component: () =>
                    import ("../components/myWelcom.vue"),
            },
            {
                path: "/1-9",
                component: () =>
                    import ("../components/myWelcom.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;