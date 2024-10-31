const requireClientAuth = (to, from, next) => {
    try {
        const token = document.cookie.split('; ').find(row => row.startsWith('tokenUser')).split('=')[1];
        if (token) {
            next();
        } else {
            next('/auth/login');
        }
    } catch (error) {
        next('/auth/login');
    }
};


const clientRoutes = [{
        path: "/books",
        name: "book-client",
        component: () =>
            import ("@/views/client/pages/books/ClientBook.vue"),
        beforeEnter: requireClientAuth
    },

    {
        path: "/reader/register",
        name: "register-client",
        component: () =>
            import ("@/views/client/pages/register/ClientRegister.vue"),
    },

    {
        path: "/auth/login",
        name: "login-client",
        component: () =>
            import ("@/views/client/pages/login/ClientLogin.vue"),
    },

    {
        path: "/reader/borrow",
        name: "borrow-client",
        component: () =>
            import ("@/views/client/pages/books/BorrowBook.vue"),
    },
    {
        path: "/reader/borrow/:id",
        name: "borrow-book",
        component: () =>
            import ("@/views/client/pages/books/ClientBorrow.vue"),
    },
    {
        path: "/",
        name: "home-book",
        component: () =>
            import ("@/views/client/pages/home/Home.vue"),
    },
    {
        path: "/seen-books",
        name: "seen-books",
        component: () =>
            import ("@/views/client/pages/home/SeenBooks.vue"),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ("@/views/client/pages/Profile/Profile.vue"),
    },
    {
        path: '/edit-profile',
        name: 'edit-profile',
        component: () =>
            import ("@/views/client/pages/Profile/EditProfile.vue"),
    },
    {
        path: '/request-reset-password',
        name: 'request-reset-password',
        component: () =>
            import ("@/views/client/pages/forgetPass/ClientRequestResetPass.vue"),
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: () =>
            import ("@/views/client/pages/forgetPass/ClientResetPass.vue"),
    },
];

export default clientRoutes;