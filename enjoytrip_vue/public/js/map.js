var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.5012778, 127.0396111), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열
var positions;


// 실제 마커가 저장된 객체 배열
var markers = [];
const TYPE_MARKER = {
    "12": "attraction.png",
    "14": "culture.png",
    "15": "festival.png",
    "25": "course.png",
    "28": "leisure.png",
    "32": "sleep.png",
    "38": "shopping.png",
    "39": "restaurant.png",
};

var imageSrc = "/assets/marker/";

var zzimObj;

function zzimClick(encodedArea) {
    
    
    if (JSON.parse(localStorage.getItem("memberStore"))["userInfo"] != null) {
        var userId = JSON.parse(localStorage.getItem("memberStore"))["userInfo"]["userId"]
        
        // 먼저 encodeURIComponent로 인코딩된 문자열을 디코드합니다.
        var decodedArea = decodeURIComponent(encodedArea);
        
        // 디코드된 문자열을 JSON 객체로 파싱합니다.
        Area = JSON.parse(decodedArea);
        var zzimBtn = document.querySelector(`.heart[data-zzim='${Area.title}']`)
        
        if (zzimBtn.classList.contains("red")) {
            zzimBtn.classList.remove("red")
            zzimBtn.classList.add("black")
            fetch("http://localhost:8080/api/removezzim", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contentId: Area.contentId,
                userId: userId
            })
        })
    } else {
        zzimBtn.classList.remove("black")
        zzimBtn.classList.add("red")
        fetch("http://localhost:8080/api/addzzim", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contentId: Area.contentId,
            userId: userId
        })
    })
}
} else {
    alert("로그인을 해주세요.")
}


}

async function makeList(data) {
    let trips = data;
    let tripList = ``;
    positions = [];
    clearMarker();
    
    let firstPosition = ``;
    
    // 로그인이 되어 있다면 해당 찜 목록 불러오기
    let zzimlist = []
    if (JSON.parse(localStorage.getItem("memberStore"))["userInfo"] != null) {
        var userId = JSON.parse(localStorage.getItem("memberStore"))["userInfo"]["userId"]
        
        try {
            const response = await fetch("http://localhost:8080/api/zzimlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId
                })
            });
            if (response.ok) {
                const data = await response.json();
                zzimlist = data;
            }
        } catch (error) {
        }
    }
    trips.forEach((area) => {
        if (area.imgSrc == "") {
            area.imgSrc = "/assets/logo.JPG"
        }
        if (zzimlist.includes(area.contentId)) {
            tripList += `
            <tr onclick="map.setCenter(new kakao.maps.LatLng(${area.mapy}, ${area.mapx}));" lat=${area.mapy} lng=${area.mapx}>
            <td>${area.title}</td>
            <td>${area.addr1} ${area.addr2}</td>
            <td><img src="${area.imgSrc}" width="100px"></td>
            <td><div class="heart_box"><div class="heart red" data-zzim="${area.title}" onclick="zzimClick('${encodeURIComponent(JSON.stringify(area))}')"></div></td>
            </tr>
            `;
            
        } else {
            tripList += `
            <tr onclick="map.setCenter(new kakao.maps.LatLng(${area.mapy}, ${area.mapx}));" lat=${area.mapy} lng=${area.mapx}>
            <td>${area.title}</td>
            <td>${area.addr1} ${area.addr2}</td>
            <td><img src="${area.imgSrc}" width="100px"></td>
            <td><div class="heart_box"><div class="heart" data-zzim="${area.title}" onclick="zzimClick('${encodeURIComponent(JSON.stringify(area))}')"></div></td>
            </tr>
            `;
        }
        
        if (!firstPosition)
        firstPosition = {
            "mapy": area.mapy,
            "mapx": area.mapx
        };
        
        let markerInfo = {
            title: area.title,
            latlng: new kakao.maps.LatLng(area.mapy, area.mapx),
            type: area.contentTypeId
        };
        positions.push(markerInfo);
    });

    document.getElementById("trip-list").innerHTML = tripList;

    displayMarker();
    if (firstPosition)
    map.setCenter(new kakao.maps.LatLng(firstPosition.mapy, firstPosition.mapx));
}

function displayMarker() {
    clearMarker();
    for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(35, 35);
        
        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc + TYPE_MARKER[positions[i].type], imageSize);
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커 이미지 
        });
        
        markers.push(marker);
    }
}

function clearMarker() {
    for (var i = 0; i < markers.length; i++)
    markers[i].setMap(null);
    markers = [];
}
