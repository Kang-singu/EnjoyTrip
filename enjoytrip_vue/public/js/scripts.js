// Set variable
const serviceKey = "xi5rO%2FcUiw%2BtMe0Q2A%2BLrWftPN%2FICIa2PVdoQoKPbsdgeZF5v2BlK6NkibWNhyGug4ytWrn7mDCcEhBw3JBt1Q%3D%3D";
var region1 = document.getElementById("region1");
var region2 = document.getElementById("region2");
var content = document.getElementById("content");
var keyword = document.getElementById("keyword");
var searchBtn = document.getElementById("btn-search");

// Scroll
document.getElementById("nav-search").addEventListener("click", () => {
    window.scrollTo(window.scrollX, 800);
});

document.getElementById("nav-home").addEventListener("click", () => {
    window.scrollTo(window.scrollX, 0);
});