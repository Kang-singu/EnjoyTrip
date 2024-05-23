<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";

import { localAxios } from "@/util/http-commons.js";
import router from "@/router/index.js";

const local = localAxios();

const name = ref("");
const title = ref("");
const content = ref("");
const parsed = ref("");

const route = useRoute();
const id = route.params.no;

const updateArticle = () => {
  const article = {
    author: name.value,
    title: title.value,
    content: content.value,
  };
  local
    .patch(`/board/articles/${id}`, article)
    .then((response) => {
      router.replace({
        name: "detail",
        params: { no: id },
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

const readArticle = (no) => {
  local
    .get("/board/articles/" + no)
    .then((response) => {
      name.value = response.data.author;
      title.value = response.data.title;
      content.value = response.data.content;
    })
    .catch((error) => {});
};

watch(content, async (newVal) => {
  parsed.value = marked(newVal);
});

onMounted(() => {
  readArticle(id);
});
</script>

<template>
  <input type="hidden" name="action" value="write" />
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
      <div class="mb-3 mt-3 flex-row">
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
  <div class="row p-3 d-flex justify-content-evenly">
    <button class="btn btn-primary text-white" @click="updateArticle">올리자곳!</button>
  </div>
</template>

<style scope>
.form-label {
  width: 100%;
}

textarea {
  resize: none;
  height: 55vh;
}

#editor {
  min-height: 80vh;
}

#preview {
  padding: 10px;
  min-height: 80vh;
}
</style>
