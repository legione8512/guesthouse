const navButtons = document.querySelectorAll(".main-nav button");
const sections = document.querySelectorAll(".content-section");
const closeButtons = document.querySelectorAll(".close-section");

function closeAllSections() {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.dataset.section;
    const targetSection = document.getElementById(sectionId);

    closeAllSections();

    if (targetSection) {
      targetSection.classList.add("active");
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeAllSections();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllSections();
  }
});

const arrivalDateInput = document.getElementById("arrival-date");
const departureDateInput = document.getElementById("departure-date");
const bookingForm = document.querySelector(".booking-form");

const today = new Date().toISOString().split("T")[0];

if (arrivalDateInput && departureDateInput) {
  arrivalDateInput.min = today;
  departureDateInput.min = today;

  arrivalDateInput.addEventListener("change", function () {
    departureDateInput.min = arrivalDateInput.value;

    if (departureDateInput.value && departureDateInput.value <= arrivalDateInput.value) {
      departureDateInput.value = "";
    }
  });
}

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    const arrivalDate = arrivalDateInput.value;
    const departureDate = departureDateInput.value;

    if (arrivalDate && departureDate && departureDate <= arrivalDate) {
      event.preventDefault();
      alert("Data plecării trebuie să fie după data sosirii.");
    }
  });
}
