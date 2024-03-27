"use strict";

// Lấy các element
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");

const tableBodyEl = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");

// Lấy dữ liệu breed từ local
let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

// Hàm xóa input
const clearInput = () => {
  breedInput.value = "";
  typeInput.value = "Select Type";
};

// Hàm xóa breed
const deleteBreed = (index) => {
  if (confirm("Are you sure?")) {
    breedArr.splice(index, 1);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderBreedTable();
  }
};

// Render bảng dữ liệu breed
function renderBreedTable() {
  tableBodyEl.innerHTML = "";

  let html = "";

  breedArr.forEach((breed, index) => {
    html += `
    <tr>
      <td>${index + 1}</td>
      <td>${breed.name}</td>
      <td>${breed.type}</td>
      <td>
        <button type="button" class="btn btn-danger" onclick="deleteBreed(${index})">Delete</button>
      </td>
    </tr>
    `;
  });

  tableBodyEl.innerHTML = html;
}

renderBreedTable();

// Thêm breed
submitBtn.addEventListener("click", () => {
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };

  let errors = [];

  if (!data.name) {
    errors.push("Please input Breed!");
  }

  if (data.type === "Select Type") {
    errors.push("Please select Type!");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
  } else {
    breedArr.push(data);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderBreedTable();
    clearInput();
  }
});
