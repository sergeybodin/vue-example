<template>
  <div class="navbar">
    <app-button class="navbar__btns" @click="$router.push('/')">Главная</app-button>
    <app-button class="navbar__btns" @click="$router.push('/posts')">Посты</app-button>
    <app-button class="navbar__btns" @click="$router.push('/stores')">store</app-button>
  </div>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style>
.navbar {
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding:0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
