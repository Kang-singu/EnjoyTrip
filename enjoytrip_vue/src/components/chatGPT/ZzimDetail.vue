<script setup>
defineProps({
  zzim: Object,
});

const emit = defineEmits(["zzimDelete"]);

const zzimDelete = (zzim) => {
  emit("zzimDelete", zzim);
};
</script>

<template>
  <tr>
    <td>{{ zzim.title }}</td>
    <td>{{ zzim.addr1 }} {{ zzim.addr2 }}</td>
    <td><img :src="zzim.imgSrc ? zzim.imgSrc : '/assets/logo.JPG'" width="100px" /></td>
    <td>
      <div class="zzim_heart_box">
        <div class="zzim_heart red" :data-zzim="zzim.title" @click="zzimDelete(zzim)"></div>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.zzim_heart_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.zzim_heart {
  width: 10px;
  height: 10px;
  position: relative;
  background-color: black;
  transform: rotate(45deg);
}

.zzim_heart::before {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: black;
  left: -50%;
  border-radius: 50%;
}

.zzim_heart::after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: black;
  top: -50%;
  border-radius: 50%;
}

.zzim_heart.red,
.zzim_heart.red::before,
.zzim_heart.red::after {
  background-color: #ea2027;
}
</style>
