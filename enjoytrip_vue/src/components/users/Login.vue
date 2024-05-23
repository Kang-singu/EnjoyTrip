<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useMemberStore } from "@/stores/member.js";
import { useMenuStore } from "@/stores/menu.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const memberStore = useMemberStore();

const { isLogin, isLoginError } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = useMenuStore();

onMounted(() => {
  const modalEl = document.getElementById("modalLogin");
  modalEl.addEventListener("hide.bs.modal", () => {
    UserInfo.value.userId = "";
    UserInfo.value.userPwd = "";
    isLoginError.value = false;
  });
});

const router = useRouter();

const UserInfo = ref({
  userId: "",
  userPwd: "",
});

const Login = async () => {
  await userLogin(UserInfo.value);
  let token = sessionStorage.getItem("accessToken");
  if (isLogin.value) {
    window.alert("로그인 완료!!!");
    const loginModalEl = document.getElementById("modalLogin");
    const loginModalInstance = Modal.getInstance(loginModalEl) || new Modal(loginModalEl);
    loginModalInstance.hide();
    getUserInfo(token);
    changeMenuState();
    router.replace({ name: "main" });
  }
};
</script>
<template>
  <div
    class="modal fade"
    id="modalLogin"
    tabindex="-1"
    aria-labelledby="modalLoginLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <!-- <input type="hidden" name="action" value="login"> -->
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalLoginLabel">로그인</h1>
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
                  <input
                    type="text"
                    class="form-control"
                    id="loginId"
                    name="userId"
                    v-model="UserInfo.userId"
                  />
                </div>
              </div>
            </section>
            <section class="" style="margin-bottom: 20px">
              <div class="row">
                <div class="col-2 me-auto" style="align-items: center">PW:</div>
                <div class="col-10">
                  <input
                    type="password"
                    class="form-control"
                    id="loginPw"
                    name="userPwd"
                    v-model="UserInfo.userPwd"
                    @keyup.enter="Login"
                  />
                </div>
              </div>
            </section>
            <section>
              <div class="mb-3 text-start" v-if="isLoginError === true">
                <div class="alert alert-danger" role="alert">
                  아이디 또는 비밀번호 확인해 주세요
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="nav-link me-auto"
            data-bs-toggle="modal"
            data-bs-target="#modalFindPW"
            style="color: red; text-decoration: underline"
          >
            비밀번호를 잊으셨나요?
          </button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-primary" @click="Login">로그인 하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
