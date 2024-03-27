"use strict";

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Export data
exportBtn.addEventListener("click", () => {
  var blob = new Blob([getFromStorage("petArr")], {
    type: "application/json",
  });

  saveAs(blob, "petArr.json");
});

// Import data
importBtn.addEventListener("click", () => {
  // Kiểm tra đã upload file chưa
  if (!fileInput.value) {
    alert("Please input file!");
  } else {
    // Đọc file
    const file = fileInput.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsText(file);
    }

    // Kiểm tra và import file
    reader.addEventListener(
      "load",
      () => {
        if (JSON.parse(reader.result)) {
          saveToStorage("petArr", reader.result);
          alert("Imported!");
        } else {
          alert("Can't import!");
        }
      },
      false
    );

    // Xóa input sau khi import
    fileInput.value = "";
  }
});
