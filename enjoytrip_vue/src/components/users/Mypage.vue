<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { localAxios } from "@/util/http-commons.js";

import { useMemberStore } from "@/stores/member";

const local = localAxios();

const router = useRouter();

const memberStore = useMemberStore();

const userId = ref("");
const userEmail = ref("");
const userPwd = ref("");
const userPwdVal = ref("");
const UserInfo = ref({});

const getUser = async () => {
  try {
    userId.value = memberStore.userInfo.userId;
    userEmail.value = memberStore.userInfo.userEmail;
  } catch {}
};

const updateUser = async () => {
  try {
    UserInfo.value.userId = userId.value;
    UserInfo.value.userEmail = userEmail.value;
    UserInfo.value.userPwd = userPwd.value;
    UserInfo.value.userPwdVal = userPwdVal.value;

    const response = await local.post("member/update", UserInfo.value);
    window.alert("비밀번호가 변경되었습니다.");
    userPwd.value = "";
    userPwdVal.value = "";
  } catch {}
};

const deleteUser = async () => {
  UserInfo.value.userId = userId.value;
  UserInfo.value.userEmail = userEmail.value;

  const response = await local.post("/member/delete", UserInfo.value);
  window.alert("탈퇴가 완료되었습니다.");
  router.replace({ name: "main" });
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <header
    class="py-5 bg-image-full"
    style="
      background-image: url('https://images.unsplash.com/photo-1613744696511-fd64320d6c7b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    "
  >
    <div class="text-center my-5 text-white">
      <div class="p-3"></div>
      <h2>회원 정보 조회 및 수정</h2>
    </div>
  </header>
  <main>
    <section class="col-6 ms-auto me-auto mt-5 mb-5 col">
      <div class="section-body">
        <div class="col mb-2">
          <section class="">
            <div class="row">
              <div class="col-3 me-auto" style="align-items: center">ID:</div>
              <div class="col-9">
                <input
                  type="text"
                  readonly
                  class="form-control"
                  id="userid"
                  name="userId"
                  v-model="userId"
                />
              </div>
            </div>
          </section>
          <section class="">
            <div class="row">
              <div class="col-3 me-auto" style="align-items: center">Email:</div>
              <div class="col-9">
                <input
                  type="text"
                  readonly
                  class="form-control"
                  id="useremail"
                  name="userEmail"
                  v-model="userEmail"
                />
              </div>
            </div>
          </section>
          <section class="">
            <div class="row">
              <div class="col-3 me-auto" style="align-items: center">PW:</div>
              <div class="col-9">
                <input
                  type="password"
                  class="form-control"
                  id="userpwd"
                  name="userPwd"
                  v-model="userPwd"
                />
              </div>
            </div>
          </section>
          <section class="">
            <div class="row">
              <div class="col-3 me-auto" style="align-items: center">PW 확인:</div>
              <div class="col-9">
                <input
                  type="password"
                  class="form-control"
                  id="userpwdval"
                  name="userPwdVal"
                  v-model="userPwdVal"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="row p-3 d-flex justify-content-evenly">
        <button
          name="action"
          value="${root}/member/update"
          class="btn col col-3 btn-info"
          @click="updateUser"
        >
          비밀번호 변경하기
        </button>
        <button
          name="action"
          value="${root}/member/delete"
          class="btn col col-3 btn-danger"
          @click="deleteUser"
        >
          탈퇴하기
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
