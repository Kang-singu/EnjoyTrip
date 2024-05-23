// 한국관광공사_국문 관광정보 서비스 API 호출

const BASE_URL = "http://apis.data.go.kr/B551011/KorService1";
const PARAM_SERVICE_KEY = "MnlWGqLhuecglocqDZwBKBZ6j5MbfaQ8IGPOkph4QwPKbnAms8x8%2B1%2BT6AHiiQP5Lxq0tbaydpa79aHiPoUR8g%3D%3D";
const PARAM_MOBILE_OS = "ETC";
const PARAM_MOBILE_APP = "GBJG";
const PARAM_RESPONSE_TYPE = "json";
const PARAM_LENGTH = 100;
const PARAM_PAGE_NO = 1;
const BASE_PARAMS = `serviceKey=${PARAM_SERVICE_KEY}&MobileOS=${PARAM_MOBILE_OS}&MobileApp=${PARAM_MOBILE_APP}&_type=${PARAM_RESPONSE_TYPE}&numOfRows=${PARAM_LENGTH}&pageNo=${PARAM_PAGE_NO}`;

const ENUM_CONTENT_TYPE_ID = {
    "관광지": 12,
    "문화시설": 14,
    "행사": 15,
    "여행코스": 25,
    "레포츠": 28,
    "숙박": 32,
    "쇼핑": 38,
    "음식점": 39,
};

// F00. 기본 기능
// F00-1. 전국의 세부 행정단위를 호출하는 function
// endpoint는 `areaCode1`
// null을 넘겨주면 전국의 도 단위를 호출함.
const callAreaCode = (areaCode, callback) => {
    const url = `${BASE_URL}/areaCode1?${BASE_PARAMS}`;
    const optionalParam  = areaCode ? `&areaCode=${areaCode}` : '';  
    fetch(url + optionalParam)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {});
}



// F01-1. 지역기반 관광지를 호출하는 function
// endpoint는 `areaBasedList1`
// 각각의 파라미터가 없을 경우에는 `null`로 넘겨주면 됨.
const callAreaBasedList1 = (areaCode, sigunguCode, contentTypeId, callback) => {
    const url = `${BASE_URL}/areaBasedList1?${BASE_PARAMS}`;
    
    const optionalParamAreaCode  = areaCode ? `&areaCode=${areaCode}` : '';
    const optionalParamSigunguCode  = sigunguCode ? `&sigunguCode=${sigunguCode}` : '';
    const optionalParamContentTypeId  = contentTypeId ? `&contentTypeId=${contentTypeId}` : '';
    
    const optionalParam = optionalParamAreaCode + optionalParamSigunguCode + optionalParamContentTypeId;
    fetch(url + optionalParam)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {});
};

// F01-2. 키워드, 지역기반function.
// endpoint는 `searchKeyword1/`

const callSearchKeyword1 = (keyword, areaCode, sigunguCode, contentTypeId, callback) => {
    const url = `${BASE_URL}/searchKeyword1?${BASE_PARAMS}`;
    
    const optionalParamAreaCode  = areaCode ? `&areaCode=${areaCode}` : '';
    const optionalParamSigunguCode  = sigunguCode ? `&sigunguCode=${sigunguCode}` : '';
    const optionalParamContentTypeId  = contentTypeId ? `&contentTypeId=${contentTypeId}` : '';
    const optionalParamKeyword  = keyword ? `&keyword=${keyword}` : '';
    
    const optionalParam = optionalParamAreaCode + optionalParamSigunguCode + optionalParamContentTypeId + optionalParamKeyword;
    fetch(url + optionalParam)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {});
};


// F02-1. 숙박정보조회를 호출하는 function.
// endpoint는 `searchStay1`
const callSearchStay1 = (areaCode, sigunguCode, callback) => {
    const url = `${BASE_URL}/searchStay1?${BASE_PARAMS}`;
    
    const optionalParamAreaCode  = areaCode ? `&areaCode=${areaCode}` : '';
    const optionalParamSigunguCode  = sigunguCode ? `&sigunguCode=${sigunguCode}` : '';
    
    const defaultParamListYN = `&listYN=Y`;
    
    const optionalParam = optionalParamAreaCode + optionalParamSigunguCode;
    fetch(url + optionalParam + defaultParamListYN)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {});
}

const callStayAPI = (areaCode, sigunguCode, callback) => {
    callSearchStay1(areaCode, sigunguCode, callback);
}

// F02-2. 음식점정보조회를 하는 function.
// callAreaBasedList의 wrapper.
const callRestaurantAPI = (areaCode, sigunguCode, callback) => {
    callAreaBasedList(areaCode, sigunguCode, ENUM_CONTENT_TYPE_ID['음식점'], callback);
};