<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Masquer le défilement horizontal */
  overflow-y: scroll;
  /* overflow-y: hidden; */
}

</style>
