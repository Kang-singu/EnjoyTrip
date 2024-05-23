<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { ref } from "vue";

const userId = ref("");
const userEmail = ref("");
const userInfo = ref({});
import { localAxios } from "@/util/http-commons.js";

const local = localAxios();

const searchPw = async () => {
  try {
    userInfo.value.userId = userId.value;
    userInfo.value.userEmail = userEmail.value;

    await local.post("/member/search", userInfo.value).then((response) => {
      userInfo.value = response.data;
      if (userInfo.alue == null) {
        window.alert("해당 정보가 없습니다.");
      } else {
        window.alert("해당 비밀번호는\n\n" + userInfo.value.userPwd + "\n\n입니다.");
      }
      const searchModalEl = document.getElementById("modalFindPW");
      const searchModalInstance = Modal.getInstance(searchModalEl) || new Modal(searchModalEl);
      searchModalInstance.hide();
    });
  } catch (error) {}
};
</script>

<template>
  <div
    class="modal fade"
    id="modalFindPW"
    tabindex="-1"
    aria-labelledby="modalFindPWLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalFindPWLabel">비밀번호 찾기</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="col">
            <section class="" style="margin-bottom: 20px">
              <div class="row">
                <div class="col-2 me-auto" style="align-items: center">ID:</div>
                <div class="col-10">
                  <input type="text" class="form-control" id="id" v-model="userId" />
                </div>
              </div>
            </section>
            <section class="" style="margin-bottom: 20px">
              <div class="row">
                <div class="col-2 me-auto" style="align-items: center">Email:</div>
                <div class="col-10">
                  <input type="text" class="form-control" id="pw" v-model="userEmail" />
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="searchPw">비밀번호 찾기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
