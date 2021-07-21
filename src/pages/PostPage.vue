<template>
  <div>
    <h1>Страница с постами</h1>
    <app-input
        v-model="searchQuery"
        placeholder="Поиск ..."
        v-focus
    />
    <div class="app__btns">
      <app-button
          @click="showDialog"
          style="margin: 15px 0"
      >
        Добавить пост
      </app-button>
      <app-select
          v-model="selectedSort"
          :options="sortOptions"
      >
      </app-select>
    </div>
    <app-dialog
        v-model:show="dialogVisible"
    >
      <post-form
          @create="createPost"
      />
    </app-dialog>
    <post-list
        :posts="sortedAndSearchPosts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>
      <h3>Идет загрузка ...</h3>
    </div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPage"-->
    <!--          :key="page"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': page === pageNumber-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>
<script>
import axios from 'axios';
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import AppButton from "@/components/UI/AppButton";
import AppSelect from "@/components/UI/AppSelect";
import AppInput from "@/components/UI/AppInput";

export default {
  components: {
    AppInput,
    AppSelect,
    AppButton,
    PostList,
    PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        {
          value: 'title',
          name: 'По названию'
        },
        {
          value: 'body',
          name: 'По содержанию'
        }
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      this.isPostLoading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка');
      } finally {
        this.isPostLoading = false;
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // }

    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка');
      }
    },
  },
  mounted() {
    this.fetchPosts();
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // };
    // const callback = (entries, observer) => {
    //   if(entries[0].isIntersecting && this.page < this.totalPage) {
    //     this.loadMorePosts();
    //   }
    // }
    // const observer = (new IntersectionObserver(callback, options)).observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => a[this.selectedSort]?.localeCompare(b[this.selectedSort]));
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(post => post.title.includes(this.searchQuery));
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>
<style>
.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid green;
}
.observer {
  height: 30px;
  background: teal;
}
</style>
