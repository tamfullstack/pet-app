"use strict";

// Lấy các element
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const formEl = document.getElementById("container-form");
const tableBodyEl = document.getElementById("tbody");

// Khai báo biến
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
let errors = [];

// Hàm thêm lỗi thiếu input
const pushEmptyInputError = (key) => {
  errors.push(`Please input for ${key}`);
};

// Hàm mở form chỉnh sửa dữ liệu
const startEditPet = (petId) => {
  formEl.classList.remove("hide");

  const petEdit = petArr.find((pet) => pet.id === petId);

  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

  const breedArrFilted = breedArr.filter(
    (breed) => breed.type === petEdit.type
  );

  breedArrFilted.forEach((breed) => {
    const option = document.createElement("option");
    option.innerHTML = breed.name;
    breedInput.appendChild(option);
  });

  idInput.value = petEdit.id;
  nameInput.value = petEdit.name;
  ageInput.value = petEdit.age;
  typeInput.value = petEdit.type;
  weightInput.value = petEdit.weight;
  lengthInput.value = petEdit.length;
  colorInput.value = petEdit.color;
  breedInput.value = petEdit.breed;
  vaccinatedInput.checked = petEdit.vaccinated;
  dewormedInput.checked = petEdit.dewormed;
  sterilizedInput.checked = petEdit.sterilized;
};

// Render dữ liệu edit
function renderEditTable() {
  tableBodyEl.innerHTML = "";
  let html = "";

  petArr.forEach((pet) => {
    const petDate = new Date(Date.parse(pet.date));

    html += `
      <tr>
        <th scope="row">${pet.id}</th>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight} kg</td>
        <td>${pet.length} cm</td>
        <td>${pet.breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
        </td>
        <td><i class="bi ${
          pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${
          pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${
          pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td>${petDate.getDate()}/${
      petDate.getMonth() + 1
    }/${petDate.getFullYear()}</td>
        <td>
          <button type="button" class="btn btn-warning"  onclick="startEditPet('${
            pet.id
          }')">Edit</button>
        </td>
    </tr>
    `;
  });

  tableBodyEl.innerHTML = html;
}

renderEditTable();

// Xử lý submit
submitBtn.addEventListener("click", () => {
  const index = petArr.findIndex((pet) => pet.id === idInput.value);

  // Lưu dữ liệu vào object
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(Date.parse(petArr[index].date)),
  };

  // Phát hiện lỗi input
  errors = [];

  if (!data.name) {
    pushEmptyInputError("name");
  }

  if (!data.age) {
    pushEmptyInputError("age");
  } else if (data.age < 1 || data.age > 15) {
    errors.push("Age must be between 1 and 15!");
  }

  if (data.type === "Select Type") {
    errors.push("Please select Type!");
  }

  if (!data.weight) {
    pushEmptyInputError("weight");
  } else if (data.weight < 1 || data.weight > 15) {
    errors.push("Weight must be between 1 and 15!");
  }

  if (!data.length) {
    pushEmptyInputError("length");
  } else if (data.length < 1 || data.length > 100) {
    errors.push("Length must be between 1 and 100!");
  }

  if (data.breed === "Select Breed") {
    errors.push("Please select Breed!");
  }

  // Xử lý lỗi
  if (errors.length > 0) {
    // Nếu có lỗi thì thông báo lỗi
    alert(errors.join("\n"));
  } else {
    // Nếu không có lỗi sửa và lưu lại dữ liệu
    petArr[index] = data;
    saveToStorage("petArr", JSON.stringify(petArr));
    renderEditTable();
    formEl.classList.add("hide");
    setTimeout(() => {
      alert("Updated!");
    }, 50);
  }
});

// Hiển thị breed
typeInput.addEventListener("change", () => {
  breedInput.innerHTML = "<option>Select Breed</option>";
  let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

  let breedArrFilted = breedArr.filter(
    (breed) => breed.type === typeInput.value
  );

  breedArrFilted.forEach((breed) => {
    const option = document.createElement("option");
    option.innerHTML = breed.name;
    breedInput.appendChild(option);
  });
});
