<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { ref, onMounted } from "vue";
import { localAxios } from "@/util/http-commons.js";

const local = localAxios();

const isuserId = ref(false);
const isuserEmail = ref(false);
const isuserPwd = ref(false);
const isPwdSame = ref(false);
const isError = ref(false);

const userId = ref("");
const userEmail = ref("");
const userPwd = ref("");
const userPwdVal = ref("");
const UserInfo = ref({});

onMounted(() => {
  const joinModalEl = document.getElementById("modalRegister");
  joinModalEl.addEventListener("hide.bs.modal", () => {
    userId.value = "";
    userEmail.value = "";
    userPwd.value = "";
    userPwdVal.value = "";
    isuserId.value = false;
    isuserEmail.value = false;
    isuserPwd.value = false;
    isPwdSame.value = false;
    isError.value = false;
  });
});
const isCheck = () => {
  isuserId.value = userId.value !== "";
  isuserEmail.value = userEmail.value !== "";
  isuserPwd.value = userPwd.value !== "";
  isPwdSame.value = userPwd.value === userPwdVal.value;

  isError.value = !isuserId.value || !isuserEmail.value || !isuserPwd.value || !isPwdSame.value;
};

const joinUser = async () => {
  isCheck();

  if (!isError.value) {
    UserInfo.value.userId = userId.value
    UserInfo.value.userEmail = userEmail.value
    UserInfo.value.userPwd = userPwd.value
    UserInfo.value.userPwdVal = userPwdVal.value
    const response = await local.post("/member/join", UserInfo.value);
    window.alert("회원가입이 완료되었습니다.\n로그인을 진행해주세요.");
    const joinModalEl = document.getElementById("modalRegister");
    const joinModalInstance = Modal.getInstance(joinModalEl) || new Modal(joinModalEl);
    joinModalInstance.hide();
  }
};
</script>

<template>
  <div class="modal fade" id="modalRegister" tabindex="-1" aria-labelledby="modalRegisterLabel" aria-hidden="true">
    <div class="modal-dialog">
      <!-- <input type="hidden" name="action" value="join" /> -->
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalRegisterLabel">회원가입</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="col">
            <section class="" style="margin-bottom: 20px">
              <div class="row">
                <div class="col-3 me-auto" style="align-items: center">ID:</div>
                <div class="col-9">
                  <input type="text" class="form-control" id="joinId" name="userId" v-model="userId" />
                </div>
              </div>
            </section>
            <section class="" style="margin-bottom: 20px">
              <div class="row">
                <div class="col-3 me-auto" style="align-items: center">Email:</div>
                <div class="col-9">
                  <input type="text" class="form-control" id="email" name="userEmail" v-model="userEmail" />
                </div>
              </div>
            </section>
            <section class="" style="margin-bottom: 20px">
              <div class="row">
                <div class="col-3 me-auto" style="align-items: center">PW:</div>
                <div class="col-9">
                  <input type="password" class="form-control" id="joinPw" name="userPwd" v-model="userPwd" />
                </div>
              </div>
            </section>
            <section class="" style="margin-bottom: 20px">
              <div class="row">
                <div class="col-3 me-auto" style="align-items: center">PW 확인:</div>
                <div class="col-9">
                  <input type="password" class="form-control" id="pwval" name="userPwdVal" v-model="userPwdVal" />
                </div>
              </div>
            </section>
            <template v-if="isError === true">
              <template v-if="isuserId === false">
                <div class="mb-3 text-start">
                  <div class="alert alert-danger" role="alert">아이디를 입력해주세요.</div>
                </div>
              </template>
              <template v-else-if="isuserEmail === false">
                <div class="mb-3 text-start">
                  <div class="alert alert-danger" role="alert">이메일을 입력해주세요.</div>
                </div>
              </template>
              <template v-else-if="isuserPwd === false">
                <div class="mb-3 text-start">
                  <div class="alert alert-danger" role="alert">비밀번호를 입력해주세요.</div>
                </div>
              </template>
              <template v-else-if="isPwdSame === false">
                <div class="mb-3 text-start">
                  <div class="alert alert-danger" role="alert">
                    입력하신 비밀번호가 다릅니다. 다시 입력해주세요.
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="joinUser">회원가입 하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
