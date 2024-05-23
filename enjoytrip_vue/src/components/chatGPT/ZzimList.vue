<script setup>
import { ref, onMounted } from "vue";
import { localAxios } from "@/util/http-commons.js";
import { httpStatusCode } from "@/util/http-status";
import ZzimDetail from "@/components/chatGPT/ZzimDetail.vue";

const local = localAxios();

const zzimlist = ref([]);

const getlist = () => {
  return zzimlist.value;
};

defineExpose({
  getlist,
});

const getZzimlist = async () => {
  const userId = JSON.parse(localStorage.getItem("memberStore"))["userInfo"]["userId"];
  const response = await local.get(`/api/attractions?userId=${userId}`);
  zzimlist.value = response.data;
};

const zzimDelete = async (zzim) => {
  try {
    const userId = JSON.parse(localStorage.getItem("memberStore"))["userInfo"]["userId"];
    const response = await local.post("/api/removezzim", {
      contentId: zzim.contentId,
      userId: userId,
    });
    if ((response.status = httpStatusCode.OK)) {
      const idx = zzimlist.value.findIndex((z) => z.contentId === zzim.contentId);
      zzimlist.value.splice(idx, 1);
    }
  } catch (error) {}
};
onMounted(() => {
  getZzimlist();
});
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr class="fs-4">
        <th>관광지명</th>
        <th>주소</th>
        <th>대표이미지</th>
        <th style="width: 100px">찜 버튼</th>
      </tr>
    </thead>
    <tbody>
      <ZzimDetail
        v-for="zzim in zzimlist"
        :key="zzim.contentId"
        :zzim="zzim"
        @zzim-delete="zzimDelete"
      />
    </tbody>
  </table>
</template>

<style scoped></style>
