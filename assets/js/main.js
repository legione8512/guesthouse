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
