"use strict";

// Lấy các element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");

const tableBodyEl = document.getElementById("tbody");

// Lấy dữ liệu từ local
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];

// Xử lý tìm kiếm
findBtn.addEventListener("click", () => {
  const petArrSearch = petArr.filter((pet) => {
    const idValid = pet.id.toUpperCase().includes(idInput.value.toUpperCase());
    const nameValid = pet.name
      .toUpperCase()
      .includes(nameInput.value.toUpperCase());
    const typeValid =
      typeInput.value === "Select Type" ? true : typeInput.value === pet.type;

    const breedValid =
      breedInput.value === "Select Breed"
        ? true
        : breedInput.value === pet.breed;

    const vaccinatedValid =
      vaccinatedInput.checked === false ? true : pet.vaccinated;

    const dewormedValid = dewormedInput.checked === false ? true : pet.dewormed;

    const sterilizedValid =
      sterilizedInput.checked === false ? true : pet.sterilized;

    return (
      idValid &&
      nameValid &&
      typeValid &&
      breedValid &&
      vaccinatedValid &&
      dewormedValid &&
      sterilizedValid
    );
  });

  tableBodyEl.innerHTML = "";
  let html = "";

  petArrSearch.forEach((pet) => {
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
      </tr>
    `;
  });

  tableBodyEl.innerHTML = html;
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
