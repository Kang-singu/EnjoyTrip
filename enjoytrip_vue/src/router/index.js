import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from "pinia"
import { useMemberStore } from "@/stores/member"
import MainView from "@/views/MainView.vue"
import BoardView from "@/views/BoardView.vue"
import List from "@/components/boards/List.vue"
import Write from "@/components/boards/Write.vue"
import Detail from "@/components/boards/Detail.vue"
import Mypage from "@/components/users/Mypage.vue"
import ChatView from "@/views/ChatView.vue"

const onlyAuthUser = async () => {
  const memberStore = useMemberStore()

  const { userInfo, isValidToken } = storeToRefs(memberStore)
  const { getUserInfo, userLogout } = memberStore
  let token = sessionStorage.getItem("accessToken")
  if (userInfo.value != null && token) {
    await getUserInfo(token)
  }

  if (!isValidToken.value) {
    if (userInfo.value === null) {
      window.alert("접근 권한이 없습니다.\n로그인을 진행해주세요.")
    } else {
      userLogout()
    }
    next()
  }
  // if (!isValidToken.value || userInfo.value === null) {
  //   window.alert("접근 권한이 없습니다.\n로그인을 진행해주세요.")
  //   // <RouterLink class="nav-link" data-bs-toggle="modal" data-bs-target="#modalLogin">
  // } else {
  //   next()
  // }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView
    },
    {
      path: "/board",
      name: "board",
      component: BoardView,
      redirect: { name: "list" },
      children: [
        {
          path: "list",
          name: "list",
          component: List
        },
        {
          path: "detail/:no",
          name: "detail",
          beforeEnter: onlyAuthUser,
          component: Detail
        },
        {
          path: "write",
          name: "write",
          beforeEnter: onlyAuthUser,
          component: Write
        },
        {
          path: "update/:no",
          name: "update",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/boards/Update.vue"),
        }
      ]
    },
    {
      path: "/userMypage",
      name: "user-mypage",
      beforeEnter: onlyAuthUser,
      component: Mypage
    },
    {
      path: "/chatGPT",
      name: "chatGPT",
      component: ChatView,
      beforeEnter: onlyAuthUser
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router