<template>
  <div>
    <h1>Страница с постами</h1>
    <h1>{{$store.state.likes}}</h1>
        <h1>{{ $store.state.isAuth ? "Пользователь авторизован" : "Авторизуйтесь"}}</h1>
        <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
      <app-button @click="$store.commit('incrementLike')">Лайк</app-button>
      <app-button @click="$store.commit('decrementLike')">Дизлайк</app-button>
    </div>
    <app-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
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
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import AppButton from "@/components/UI/AppButton";
import AppSelect from "@/components/UI/AppSelect";
import AppInput from "@/components/UI/AppInput";
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

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
      dialogVisible: false,
    }
  },
  methods: {
    ...mapState({

    }),
    ...mapGetters({

    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPage: state => state.post.totalPage,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchPosts: 'post/sortedAndSearchPosts'
    }),
  },
  watch: {
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
