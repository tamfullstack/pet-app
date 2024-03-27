"use strict";

// Bổ sung Animation cho Sidebar
let sidebarEl = document.getElementById("sidebar");

sidebarEl.addEventListener("click", () => {
  sidebarEl.classList.toggle("active");
});

// Hàm lưu trữ dữ liệu local
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Hàm lấy dữ liệu local
function getFromStorage(key) {
  return localStorage.getItem(key);
}
