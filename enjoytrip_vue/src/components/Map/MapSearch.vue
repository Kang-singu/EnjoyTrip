<script setup>

</script>

<template>
    <div class="py-5 bg-image-full">
        <div class="d-flex flex-column justify-content-evenly" style="height: 10rem">
            <div class="row justify-content-center">
                <div class="col-lg-6 text-center text-white fs-2 mb-3">관광 정보</div>
            </div>
            <div class="row justify-content-center mb-3"
            data-aos="zoom-in">
                <!-- Map section-->
                <div class="col col-sm-2">
                    <select class="form-select" id="region1">
                        <option selected>시도</option>
                        <option value="1">서울</option>
                        <option value="2">인천</option>
                        <option value="3">대전</option>
                        <option value="4">대구</option>
                        <option value="5">광주</option>
                        <option value="6">부산</option>
                        <option value="7">울산</option>
                        <option value="8">세종</option>
                        <option value="31">경기</option>
                        <option value="32">강원</option>
                        <option value="33">충북</option>
                        <option value="34">충남</option>
                        <option value="35">경북</option>
                        <option value="36">경남</option>
                        <option value="37">전북</option>
                        <option value="38">전남</option>
                        <option value="39">제주</option>
                    </select>
                </div>
                <div class="col col-lg-2 col-md-2">
                    <select class="form-select" id="region2">
                        <option selected>군구</option>
                    </select>
                </div>
                <div class="col col-lg-2">
                    <select class="form-select" id="content">
                        <option selected>컨텐츠</option>
                        <option value="12">관광지</option>
                        <option value="14">문화시설</option>
                        <option value="15">행사</option>
                        <option value="25">여행코스</option>
                        <option value="28">레포츠</option>
                        <option value="32">숙박</option>
                        <option value="38">쇼핑</option>
                        <option value="39">음식점</option>
                    </select>
                </div>
                <div class="col col-lg-3 col-md-4">
                    <input class="form-control" type="text" placeholder="검색어" id="keyword" />
                </div>
                <div class="col col-2 col-lg-1">
                    <button id="btn-search" type="button" class="btn bg-white">검색!</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-image-full {
    background-image: url('https://images.unsplash.com/photo-1499063078284-f78f7d89616a?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
</style>