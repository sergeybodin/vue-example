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
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import AppButton from "@/components/UI/AppButton";
import AppSelect from "@/components/UI/AppSelect";
import AppInput from "@/components/UI/AppInput";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchPosts from "@/hooks/useSortedAndSearchPosts";

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
      sortOptions: [
        {
          value: 'title',
          name: 'По названию'
        },
        {
          value: 'body',
          name: 'По содержанию'
        }
      ]
    }
  },
  setup(props) {
    const {posts, isPostLoading, totalPages, loadMorePosts} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchPosts} = useSortedAndSearchPosts(sortedPosts);
    return {
      posts,
      isPostLoading,
      totalPages,
      loadMorePosts,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchPosts
    }
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
