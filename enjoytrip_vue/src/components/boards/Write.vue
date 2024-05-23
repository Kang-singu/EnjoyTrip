<script setup>
import { onMounted, ref, watch } from "vue";
import { marked } from "marked";

import { localAxios } from "@/util/http-commons.js";
import router from "@/router/index.js";

import { useMemberStore } from "@/stores/member";

const local = localAxios();

const name = ref("");
const title = ref("");
const content = ref("");
const parsed = ref("");

const emit = defineEmits(["createArticle"]);

const createArticle = () => {
  const article = {
    author: name.value,
    title: title.value,
    content: content.value,
    viewCount: 0,
  };

  local
    .post("/board/articles", article)
    .then((response) => {
      router.replace({
        name: "detail",
        params: { no: response.data },
      });
    })
    .catch((error) => {});
};

const UPLOAD_MSG = "![](uploading...)";

const pasteHandler = (e) => {
  for (let i = 0; i < e.clipboardData.items.length; ++i) {
    let item = e.clipboardData.items[i];
    if (item.kind == "file" && item.type.startsWith("image/")) {
      content.value += UPLOAD_MSG; // TODO: write exactly before cursor
      uploadImage(item.getAsFile());
    }
  }
};

const uploadImage = (img) => {
  // upload using FormData
  const formData = new FormData();
  formData.append("file", img);

  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  local
    .post("/img/", formData, config)
    .then((response) => {
      content.value = content.value.replace(UPLOAD_MSG, `![](${response.data.value})`);
    })
    .catch((error) => {
      content.value = content.value.replace(UPLOAD_MSG, `![](${response.data.value})`);
    });
};

const memberStore = useMemberStore();

watch(content, async (newVal) => {
  parsed.value = marked(newVal);
});

onMounted(() => {
  name.value = memberStore.userInfo.userId;
});
</script>

<template>
  <div class="container d-flex justify-content-around align-items-stretch">
    <div id="editor" class="col col-6 p-2 flex-row justify-content-start">
      <div class="mb-3">
        <label class="form-label fs-5">
          이름
          <input
            type="text"
            readonly
            id="nickname"
            name="nickname"
            class="form-control"
            v-model="name"
          />
        </label>
      </div>
      <div class="mb-3 mt-3">
        <label class="form-label fs-5">
          제목
          <input type="text" id="" name="title" class="form-control" v-model="title" />
        </label>
      </div>
      <div class="mb-3 mt-3">
        <label class="form-label fs-5">
          내용
          <textarea
            id="content"
            name="content"
            class="form-control"
            v-model="content"
            @paste="pasteHandler"
          ></textarea>
        </label>
      </div>
    </div>

    <div id="preview" class="col col-6 p-2">
      <div>
        <h1 v-text="title ? title : `제목을 입력해주세요`"></h1>
        <span id="author">by {{ name }}</span>
      </div>
      <hr />
      <div>
        <span v-html="parsed"></span>
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: center">
    <div class="col col-6 row p-3 d-flex justify-content-around">
      <button class="btn btn-primary col col-2" @click="createArticle">올리자곳!</button>
      <input type="reset" class="btn btn-danger col col-2" value="다시쓰자곳!" />
    </div>
  </div>
</template>

<style scoped>
.form-label {
  width: 100%;
}

textarea {
  resize: none;
  min-height: 55vh;
}

#editor {
  min-height: 80vh;
}

#preview {
  padding: 10px;
  min-height: 80vh;
}
</style>
