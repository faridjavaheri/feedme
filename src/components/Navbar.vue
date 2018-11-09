<template>
<div class="navbar">
  <nav class="nav-extended deep-red darken-2">
    <div class="nav-content">
      <router-link :to="{name: 'Index'}">
        <span class="nav-title">Feed.Me</span>
      </router-link>

    <ul class="right">
    <li><a href="">Signup</a></li>
    <li><a href="">Login</a></li>
    </ul>

      <a href="" class="btn-floating btn-large halfway-fab pink">
<router-link :to="{name: 'AddDish'}">
<i class="material-icons">add</i>
</router-link>
</a>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  }
}
</script>

<style>
.navbar nav{
  padding: 20px 20px; /* 20 px left & right */
}
.right {padding: 0 20px;}
</style>
