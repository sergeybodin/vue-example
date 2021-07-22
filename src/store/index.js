import {createStore} from "vuex";
import {postModule} from "@/store/postModule";

export default createStore({
    state: {
        likes: 2,
        isAuth: false,
    },
    getters: {
        doubleLikes(state) {
            return state.likes * 2;
        }
    },
    mutations: {
        incrementLike(state) {
            state.likes += 1;
        },
        decrementLike(state) {
            state.likes -= 1;
        }
    },
    actions: {

    },
    modules: {
        post: postModule
    }
})
