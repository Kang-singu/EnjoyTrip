<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import ListValue from "@/components/boards/ListValue.vue";
import { localAxios } from "@/util/http-commons.js";

const local = localAxios();

const boardList = ref([]);

onMounted(() => {
  readArticle();
});

const readArticle = () => {
  local
    .get("/board/articles")
    .then((response) => {
      boardList.value = response.data;
    })
    .catch((error) => {});
};
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <table class="table table-light text-center border">
          <thead class="fs-4">
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>조회수</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            <ListValue v-for="board in boardList" :board="board" />
          </tbody>
        </table>
      </div>
    </div>
    <div class="row p-3 d-flex justify-content-center">
      <RouterLink
        :to="{ name: 'write' }"
        class="btn btn-primary col col-2"
        style="text-decoration: none"
        >나도 쓰자곳!
      </RouterLink>
    </div>
  </main>
</template>

<style scoped></style>
