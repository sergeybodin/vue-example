import axios from "axios";
import {ref, onMounted} from 'vue';

export function usePosts(limit) {
    const isPostLoading = ref(false);
    const posts = ref([])
    const totalPages = ref(0)
    const page = ref(1);
    const fetching = async () => {
        try {
            isPostLoading.value = true;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
            posts.value = response.data;
        } catch (e) {
            alert('Ошибка');
        } finally {
            isPostLoading.value = false;
        }
    }

    const loadMorePosts = async () => {
        try {
            page.value += 1;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
            posts.value = [...posts.value, ...response.data];
        } catch (e) {
            alert('Ошибка');
        }
    }

    onMounted(fetching())

    return {
        isPostLoading,
        totalPages,
        posts,
        loadMorePosts
    }
}
