<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useMenuStore } from "@/stores/menu.js";
import { useMemberStore } from "@/stores/member.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import Login from "@/components/users/Login.vue";
import Join from "@/components/users/Join.vue";
import FindPw from "@/components/users/FindPw.vue";

const menuStore = useMenuStore();
const memberStore = useMemberStore();

const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;
const { userLogout } = memberStore;

const logout = () => {
  changeMenuState();
  userLogout();
};

onMounted(() => {
  document.getElementById("nav-search").addEventListener("click", () => {
    window.scrollTo(window.scrollX, 800);
  });

  document.getElementById("nav-home").addEventListener("click", () => {
    window.scrollTo(window.scrollX, 0);
  });
});
</script>

<template>
  <!-- Modals-->
  <!-- Login Modal -->
  <Login></Login>

  <!-- Register Modal -->
  <Join></Join>

  <!-- FindPW Modal -->
  <FindPw></FindPw>

  <!-- Responsive navbar-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="/">가보자곳!</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink :to="{ name: 'main' }" class="nav-link" aria-current="page" id="nav-home"
              >처음으로</RouterLink
            >
            <!-- <a class="nav-link" aria-current="page" href="#" id="nav-home">처음으로!</a> -->
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'main' }" class="nav-link" id="nav-search"
              >찾아보자곳!</RouterLink
            >
            <!-- <a class="nav-link" id="nav-search">찾아보자곳!</a> -->
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'chatGPT' }" class="nav-link" id="nav-chatGPT"
              >물어보자곳!</RouterLink
            >
            <!-- <a class="nav-link" id="nav-chatGPT">물어보자곳!</a> -->
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'board' }" class="nav-link" id="nav-board"
              >떠들자곳!</RouterLink
            >
            <!-- <a class="nav-link" id="nav-board">떠들자곳!</a> -->
          </li>

          <template v-for="menu in menuList" :key="menu.routeName">
            <template v-if="menu.show">
              <template v-if="menu.routeName === 'user-logout'">
                <li class="nav-item">
                  <RouterLink
                    to="/"
                    @click.prevent="logout"
                    class="nav-link"
                    aria-current="page"
                    href="#"
                    id="nav-home"
                    >{{ menu.name }}</RouterLink
                  >
                </li>
              </template>
              <template v-else-if="menu.routeName === 'user-login'">
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="modal" data-bs-target="#modalLogin">
                    {{ menu.name }}
                  </button>
                </li>
              </template>
              <template v-else-if="menu.routeName === 'user-join'">
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="modal" data-bs-target="#modalRegister">
                    {{ menu.name }}
                  </button>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <RouterLink :to="{ name: menu.routeName }" class="nav-link">{{
                    menu.name
                  }}</RouterLink>
                </li>
              </template>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
