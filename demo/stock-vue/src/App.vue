<template>
  <div id="nav">
    <router-link
      v-for="link in routes"
      :key="link.path"
      :to="link.path"
      style="margin-right: 10px;"
      >{{ link.name }}</router-link
    >
  </div>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { routes } from "./router/";
export default defineComponent({
  setup() {
    return {
      routes,
    };
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
