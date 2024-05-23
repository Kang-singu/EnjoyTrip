import { ref } from "vue"
import { useRouter } from "vue-router"
import { defineStore } from "pinia"
import { localAxios } from "@/util/http-commons.js";
import { httpStatusCode } from "@/util/http-status"
import { jwtDecode } from "jwt-decode";
import { useMenuStore } from "@/stores/menu.js";



export const useMemberStore = defineStore("memberStore", () => {
    const menuStore = useMenuStore();
    const { changeMenuState } = menuStore;
    const local = localAxios()
    const router = useRouter()

    const isLogin = ref(false)
    const isLoginError = ref(false)
    const isValidToken = ref(false)
    const userInfo = ref(null)

    const userLogin = async (loginUser) => {
        await local.post("/member/login", loginUser)
            .then((response) => {
                if (response.status === httpStatusCode.CREATE) {
                    let { data } = response
                    let accessToken = data["access-token"]
                    let refreshToken = data["refresh-token"]
                    isLogin.value = true
                    isLoginError.value = false
                    isValidToken.value = true
                    sessionStorage.setItem("accessToken", accessToken)
                    sessionStorage.setItem("refreshToken", refreshToken)
                }
            })
            .catch((error) => {
                isLogin.value = false
                isLoginError.value = true
                isValidToken.value = false
            })
    }

    const getUserInfo = async (token) => {
        let decodeToken = jwtDecode(token)
        local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken")
        await local.get(`/member/info/${decodeToken.userId}`)
            .then((response) => {
                if (response.status === httpStatusCode.OK) {
                    userInfo.value = response.data.userInfo
                } else {
                }
            })
            .catch(
            async (error) => {
                isValidToken.value = false

                await tokenRegenerate()
            })
    }

    const tokenRegenerate = async () => {
        local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken")
        await local.post(`/member/refresh`, JSON.stringify(userInfo.value))
            .then((response) => {
                if (response.status === httpStatusCode.CREATE) {
                    let accessToken = response.data["access-token"]
                    sessionStorage.setItem("accessToken", accessToken)
                    isValidToken.value = true
            }
            })
            .catch(async (error) => {
                // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
                if (error.response.status === httpStatusCode.UNAUTHORIZED) {
                    // 다시 로그인 전 DB에 저장된 RefreshToken 제거
                    await local.get(`/member/logout/${userInfo.value.userId}`)
                        .then((response) => {
                            alert("세션이 만료되었습니다. 다시 로그인 후 시도해 주세요.")
                            changeMenuState()
                            userLogout()
                            router.replace({ name: "list" })
                        })
                        .catch((error) => {
                            isLogin.value = false
                            userInfo.value = {}
                    })
            }
        })
    }

    const userLogout = async () => {
        await local.get(`/member/logout/${userInfo.value.userId}`)
            .then((response) => {
                if (response.status === httpStatusCode.OK) {
                    isLogin.value = false
                    userInfo.value = null
                    isValidToken.value = false

                    sessionStorage.removeItem("accessToken")
                    sessionStorage.removeItem("refreshToken")
                }
            })
            .catch((error) => {
            })
    }

    return {
        userLogin,
        getUserInfo,
        tokenRegenerate,
        userLogout,
        isLogin,
        isLoginError,
        isValidToken,
        userInfo
    }
}, { persist: { storage: localStorage } })