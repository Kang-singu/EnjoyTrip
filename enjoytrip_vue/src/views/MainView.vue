<script setup>
import { onMounted } from "vue";
import { localAxios } from "@/util/http-commons.js";
import MainHeader from "@/components/Main/MainHeader.vue";
import MainContent from "@/components/Main/MainContent.vue";
import MapSearch from "@/components/Map/MapSearch.vue";
import MapResult from "@/components/Map/MapResult.vue";

onMounted(() => {
  // map.js 불러오기
  const script = document.createElement("script");
  script.src = "/js/map.js";
  script.async = true; // 비동기 로드 설정
  document.body.appendChild(script);

  script.onload = () => {
    var region1 = document.getElementById("region1");

    var region2 = document.getElementById("region2");
    var content = document.getElementById("content");
    var keyword = document.getElementById("keyword");
    var searchBtn = document.getElementById("btn-search");

    const ENUM_CONTENT_TYPE_ID = {
      관광지: 12,
      문화시설: 14,
      행사: 15,
      여행코스: 25,
      레포츠: 28,
      숙박: 32,
      음식점: 39,
      쇼핑: 38,
    };

    const local = localAxios();
    region1.addEventListener("change", () => {
      if (region1.value != "시도") {
        const num = region1.value ? region1.value : "";
        local
          .get(`/api/gungu?sido=${num}`)
          .then((response) => response.data)
          .then((data) => makeOption(data));
        // const path = "http://localhost:8080/api/gungu?sido=" + (region1.value ? region1.value : "");
        // fetch(path)
        //   .then((response) => response.json())
        //   .then((data) => makeOption(data));
      }
    });

    searchBtn.addEventListener("click", () => {
      //숫자로 바꾸기
      let sidoCode = region1.value == "시도" ? "" : region1.value;
      let gunguCode = region2.value == "군구" ? "" : region2.value;
      let contentCode = content.value == "컨텐츠" ? "" : content.value;
      let keywordCode = keyword.value ? keyword.value : "";
      if (contentCode || keywordCode) {
        let path = "https://13.125.216.70:8080/api/attractions?";
        path += "&sido=" + sidoCode;
        path += "&gungu=" + gunguCode;
        path += "&type=" + contentCode;
        path += "&keyword=" + keywordCode;
        fetch(path)
          .then((response) => response.json())
          .then((data) => {
            if (data.length) makeList(data);
            else
              document.querySelector("tbody").innerHTML = `
                    <tr>
                        <td colspan="3" class="text-danger text-center fs-1">검색 결과가 없습니다!</td>
                    </tr>`;
          });
      } else {
        document.querySelector("tbody").innerHTML = `
                <tr>
                    <td colspan="3" class="text-danger text-center fs-1">컨텐츠, 검색어 중 최소 하나는 선택해주세요!</td>
                </tr>`;
      }
    });

    function makeOption(data) {
      let areas = data;

      region2.innerHTML = "<option selected>군구</option>";
      areas.forEach((area) => {
        let opt = document.createElement("option");
        opt.setAttribute("value", area.gunguCode);
        opt.appendChild(document.createTextNode(area.name));

        region2.appendChild(opt);
      });
    }

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다

      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      var message = "클릭한 위치(" + latlng.getLat() + ", " + latlng.getLng() + ")";
      message += " 와 가까운 순으로 정렬한 결과입니다.";

      var resultMsg = document.getElementById("clickLatlng");
      resultMsg.innerHTML = message;

      var resultTable = document.getElementById("trip-list");
      var trElements = resultTable.querySelectorAll("tr");
      var trArray = Array.from(trElements);

      const sortedTrArray = mySort(trArray, (a, b) => {
        var lat0 = latlng.getLat();
        var lng0 = latlng.getLng();

        var lat1 = parseFloat(a.getAttribute("lat"));
        var lng1 = parseFloat(a.getAttribute("lng"));
        var lat2 = parseFloat(b.getAttribute("lat"));
        var lng2 = parseFloat(b.getAttribute("lng"));

        return getDistance(lat0, lng0, lat1, lng1) < getDistance(lat0, lng0, lat2, lng2);
      });

      // 정렬된 <tr> 요소들을 tbody에 추가
      sortedTrArray.forEach(function (tr) {
        resultTable.appendChild(tr);
      });
    });

    function tmp() {
      alert("");
    }

    function mergeSort(list, comp) {
      // Base case: a list of zero or one elements is sorted, by definition.
      if (list.length < 2) {
        return list;
      }

      // Step 1: Divide the array into equal halves
      const middle = Math.floor(list.length / 2);
      const left = list.slice(0, middle);
      const right = list.slice(middle);

      // Step 2: Recursively sort both sublists
      const sortedLeft = mergeSort(left, comp);
      const sortedRight = mergeSort(right, comp);

      // Step 3: Merge the sorted sublists
      return merge(sortedLeft, sortedRight, comp);
    }

    function merge(left, right, comp) {
      let result = [];
      let indexLeft = 0;
      let indexRight = 0;

      // Compare each element of the two arrays and push the smaller (according to the comparison function) onto the result array
      while (indexLeft < left.length && indexRight < right.length) {
        // Use the comparison function to decide order
        if (comp(left[indexLeft], right[indexRight])) {
          result.push(left[indexLeft]);
          indexLeft++;
        } else {
          result.push(right[indexRight]);
          indexRight++;
        }
      }

      // Concatenate the remaining elements (if any) from both arrays
      // These operations add the elements after the comparisons are complete.
      return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    }

    // Example usage:
    const mySort = (list, comp) => mergeSort(list, comp);

    function toRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }

    function getDistance(latA, lngA, latB, lngB) {
      var earthRadiusKm = 6371; // Radius of the earth in km

      var dLat = toRadians(latB - latA);
      var dLng = toRadians(lngB - lngA);

      latA = toRadians(latA);
      latB = toRadians(latB);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(latA) * Math.cos(latB);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = earthRadiusKm * c; // Distance in km

      return distance;
    }
  };
});
</script>

<template>
  <!-- Header - set the background image for the header in the line below-->

  <MainHeader></MainHeader>

  <!-- Content section-->
  <MainContent></MainContent>

  <!-- Map Search section -->
  <MapSearch></MapSearch>

  <!-- Map Result section-->
  <MapResult></MapResult>
</template>

<style scoped></style>
