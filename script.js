"use strict";

// Lấy các DOM
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

const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
// const bmiBtn = document.getElementById("bmi-btn");

// Khai báo biến
let errors = [];
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
let healthyCheck = false;
// let showBMI = false;

// Hàm thêm lỗi thiếu input
const pushEmptyInputError = (key) => {
  errors.push(`Please input for ${key}`);
};

// Hàm kiểm tra ID hợp lệ
const checkValidId = (id) => {
  return !petArr.some((pet) => pet.id === id);
};

// Hàm xóa dữ liệu đã submit
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Hàm xóa thú cưng
const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    const index = petArr.findIndex((pet) => pet.id === petId);
    petArr.splice(index, 1);
    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableData();
  }
};

// // Hàm tính BMI
// const calcBMI = (pet) => {
//   let bmi =
//     pet.type === "Dog"
//       ? (pet.weight * 703) / pet.length ** 2
//       : (pet.weight * 886) / pet.length ** 2;

//   return Math.round(bmi * 100) / 100;
// };

// Hàm render dữ liệu
function renderTableData() {
  tableBodyEl.innerHTML = "";
  let html = "";

  const petArrRender = healthyCheck
    ? petArr.filter((pet) => pet.vaccinated && pet.dewormed && pet.sterilized)
    : petArr;

  for (let pet of petArrRender) {
    let petDate = new Date(Date.parse(pet.date));

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
        <button type="button" class="btn btn-danger"  onclick="deletePet('${
          pet.id
        }')">Delete</button>
      </td>
    </tr>
    `;
  }

  tableBodyEl.innerHTML = html;
}

renderTableData();

// Bắt sự kiện click Submit
submitBtn.addEventListener("click", () => {
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
    date: new Date(),
  };

  // Phát hiện lỗi input
  errors = [];

  if (!data.id) {
    pushEmptyInputError("id");
  } else if (!checkValidId(data.id)) {
    errors.push("ID must be unique");
  }

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
    // Nếu không có lỗi thì thêm data vào mảng dữ liệu, ẩn giá trị BMI, render dữ liệu và xóa input
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr));
    // showBMI = false;
    renderTableData();
    clearInput();
  }
});

// Bắt sự kiện click nút Healthy
healthyBtn.addEventListener("click", () => {
  healthyCheck = !healthyCheck;
  healthyBtn.textContent = healthyCheck ? "Show All Pet" : "Show Healthy Pet";
  renderTableData();
});

// // Bắt sự kiện click nút BMI
// bmiBtn.addEventListener("click", () => {
//   showBMI = true;
//   renderTableData();
// });

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
