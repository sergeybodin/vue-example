import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import PostShow from "@/pages/PostShow";
import PostPageStore from "@/pages/PostPageStore";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/post/:id',
        component: PostShow
    },
    {
        path: '/stores',
        component: PostPageStore
    },
    {
        path: '/compostion',
        component: PostPageCompositionApi
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;
