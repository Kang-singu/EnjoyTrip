<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";

import { localAxios } from "@/util/http-commons.js";
import router from "@/router/index.js";

import { useMemberStore } from "@/stores/member";

const local = localAxios();

const article = ref({
  author: "",
  title: "",
  content: "",
  viewCount: 0,
});
const route = useRoute();
const id = route.params.no;

const readArticle = async (no) => {
  await local.get(`/board/updateVcnt/${id}`); // 여기에 조회수 올리는 api 사용
  const response = await local.get("/board/articles/" + no); // 여기에 글 불러오는 api 사용
  article.value = response.data;
};

const gotoUpdate = () => {
  router.push({
    name: "update",
    params: { no: id },
  });
};

const deleteArticle = (id) => {
  local
    .delete(`/board/articles/${id}`)
    .then((response) => {
      // redirect to the list page (replace)
      router.replace({
        path: "/board/list",
      });
    })
    .catch((error) => {});
};

const memberStore = useMemberStore();

const isMyArticle = computed(
  () => memberStore.userInfo && memberStore.userInfo.userId === article.value.author
);

onMounted(() => {
  readArticle(id);
});
</script>

<template>
  <div class="container col col-10">
    <div class="col p-2">
      <div>
        <h1 v-text="article.title" id="title"></h1>
        <span id="author">by {{ article.author }}</span>
      </div>
      <hr />
      <div id="content">
        <span v-html="marked.parse(article.content)"></span>
      </div>
    </div>
  </div>
  <div v-if="isMyArticle" class="row p-3 d-flex justify-content-around">
    <button class="btn btn-primary col col-2" v-on:click="gotoUpdate">수정하기</button>
    <button class="btn btn-danger col col-2" v-on:click="deleteArticle(id)">삭제하기</button>
  </div>
  <div v-else class="p-3"></div>
</template>

<style scoped></style>
