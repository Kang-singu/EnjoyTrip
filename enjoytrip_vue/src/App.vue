<script setup>
import { RouterView } from "vue-router";
import Nav from "@/components/commons/Nav.vue";
import Footer from "@/components/commons/Footer.vue";
</script>

<template>
  <!-- Navbar.vue -->
  <div class="d-flex flex-column min-vh-90">
    <div>
      <Nav></Nav>
      <RouterView />
      <Footer></Footer>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "JalnanGothic", sans-serif !important;
}

@font-face {
  font-family: "JalnanGothic";
  src: url("assets/font/JalnanGothicTTF.ttf");
}

.message img {
  max-width: 100% !important;
}
</style>
