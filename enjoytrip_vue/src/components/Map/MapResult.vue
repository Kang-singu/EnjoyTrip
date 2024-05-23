<script setup></script>

<template>
  <section class="py-5">
    <div class="container"
      data-aos="zoom-in">
      <div class="row justify-content-center mb-3">
        <div class="col-lg-6 text-center fs-2 mb-3">한눈에 보기</div>
        <div id="map" class="col-lg-8 col-sm" style="height: 500px"></div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6 text-center fs-2 mt-3">전체 보기</div>
      </div>
      <div class="row justify-content-center">
        <div class="text-center" id="clickLatlng">지도에서 원하는 곳을 클릭하면 관광지가 가까운 순으로 표시됩니다!</div>
      </div>
      <div class="row">
        <table class="table table-striped">
          <thead>
            <tr class="fs-4">
              <th>관광지명</th>
              <th>주소</th>
              <th>대표이미지</th>
              <th style="width: 100px">찜 버튼</th>
            </tr>
          </thead>
          <tbody id="trip-list"></tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style>
td {
  vertical-align: middle;
}

.td_heart {
  display: flex;
  justify-content: center;
}

.heart_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.heart {
  width: 10px;
  height: 10px;
  position: relative;
  background-color: black;
  transform: rotate(45deg);
}

.heart::before {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: black;
  left: -50%;
  border-radius: 50%;
}

.heart::after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: black;
  top: -50%;
  border-radius: 50%;
}

.heart.red,
.heart.red::before,
.heart.red::after {
  background-color: #ea2027;
}
</style>
