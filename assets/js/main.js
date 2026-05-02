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

    if (
      departureDateInput.value &&
      departureDateInput.value <= arrivalDateInput.value
    ) {
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
// I wait until the HTML page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll(".content-section");
  const closeButtons = document.querySelectorAll(".close-section");

  // I close all open sections.
  function closeAllSections() {
    sections.forEach(function (section) {
      section.classList.remove("active");
    });

    document.body.classList.remove("section-open");
  }

  // I open the section selected from the navigation.
  function openSection(sectionId) {
    closeAllSections();

    const selectedSection = document.querySelector(sectionId);

    if (selectedSection) {
      selectedSection.classList.add("active");
      document.body.classList.add("section-open");
    }
  }

  // I listen for clicks on every navigation link.
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const sectionId = link.getAttribute("href");
      openSection(sectionId);
    });
  });

  // I close the open section when the close button is clicked.
  closeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      closeAllSections();
    });
  });

  // I close the open section when Escape is pressed.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllSections();
    }
  });
});
