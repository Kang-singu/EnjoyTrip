<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  board: Object,
});

</script>

<template>
  <tr>
    <td>{{ board.no }}</td>
    <td>
      <RouterLink :to="{ name: 'detail', params: { 'no': board.no } }">{{
        board.title
      }}</RouterLink>
    </td>
    <td>{{ board.viewCount }}</td>
    <td>{{ board.author }}</td>
  </tr>
</template>

<style scoped></style>
