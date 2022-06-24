<template>
  <nav>
    <!-- <router-link to="/">AutorizationView</router-link> -->
  </nav>
  <router-view />
</template>
<script></script>

<style lang="scss">
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #2c3e50;
  background-color: #f1f9fc;
}

nav {
  padding: 30px;
  display: flex;
  flex-direction: row;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
