<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <app-button
        class="post__btn"
        @click="$router.push(`/post/${post.id}`)"
    >Открыть</app-button>
    <app-button
        @click="$emit('remove', post)"
    >Удалить</app-button>
  </div>
</template>

<script>

export default {
  props: {
    post: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btn {
  margin-right: 10px;
}
</style>
