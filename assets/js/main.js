// I remove the preload class after the full page has loaded.
// This starts the intro animation, like in the original Dimension template.
window.addEventListener("load", function () {
  window.setTimeout(function () {
    document.body.classList.remove("is-preload");
  }, 100);
});

// I wait until the HTML page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll(".content-section");
  const closeButtons = document.querySelectorAll(".close-section");

  const arrivalDateInput = document.getElementById("arrival-date");
  const departureDateInput = document.getElementById("departure-date");
  const bookingForm = document.querySelector(".booking-form");
  const contactSection = document.getElementById("contact");

  const galleryImages = document.querySelectorAll(".gallery-card img");
  const imageLightbox = document.querySelector(".image-lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");

  // I remove the hash from the URL without reloading the page.
  function clearHashFromUrl() {
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }

  // I close all open sections.
  function closeAllSections() {
    sections.forEach(function (section) {
      section.classList.remove("active");
    });

    document.body.classList.remove("section-open", "is-article-visible");
  }

  // I open the selected section.
  function openSection(sectionId) {
    closeAllSections();

    const selectedSection = document.querySelector(sectionId);

    if (selectedSection) {
      selectedSection.classList.add("active");
      document.body.classList.add("section-open", "is-article-visible");
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
      clearHashFromUrl();
    });
  });

  // I open a section automatically if the page loads with a hash, for example #contact.
  if (window.location.hash) {
    openSection(window.location.hash);
  }

  // I show a success message after the contact form was sent.
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("sent") === "1" && contactSection) {
    openSection("#contact");

    const successMessage = document.createElement("p");
    successMessage.className = "form-success-message";
    successMessage.textContent =
      "Cererea a fost trimisă cu succes. Vă vom contacta cât mai curând posibil.";

    const sectionContent = contactSection.querySelector(".section-content");

    if (sectionContent) {
      sectionContent.insertBefore(successMessage, sectionContent.firstChild);
    }
  }

  // I set the minimum date for arrival and departure to today.
  if (arrivalDateInput && departureDateInput) {
    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split("T")[0];

    arrivalDateInput.min = localToday;
    departureDateInput.min = localToday;

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

  // I check that the departure date is after the arrival date.
  if (bookingForm && arrivalDateInput && departureDateInput) {
    bookingForm.addEventListener("submit", function (event) {
      const arrivalDate = arrivalDateInput.value;
      const departureDate = departureDateInput.value;

      if (arrivalDate && departureDate && departureDate <= arrivalDate) {
        event.preventDefault();
        alert("Data plecării trebuie să fie după data sosirii.");
      }
    });
  }

  // I open the clicked gallery image in a larger view.
  function openImageLightbox(image) {
    if (!imageLightbox || !lightboxImage || !lightboxCaption) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    const caption = image.closest("figure")?.querySelector("figcaption");
    lightboxCaption.textContent = caption ? caption.textContent : image.alt;

    imageLightbox.classList.add("active");
    imageLightbox.setAttribute("aria-hidden", "false");
  }

  // I close the larger image view.
  function closeImageLightbox() {
    if (!imageLightbox || !lightboxImage) {
      return;
    }

    imageLightbox.classList.remove("active");
    imageLightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }

  galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
      openImageLightbox(image);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", function () {
      closeImageLightbox();
    });
  }

  if (imageLightbox) {
    imageLightbox.addEventListener("click", function (event) {
      if (event.target === imageLightbox) {
        closeImageLightbox();
      }
    });
  }

  // I close the image lightbox first, or the open section if no image is open.
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (imageLightbox && imageLightbox.classList.contains("active")) {
      closeImageLightbox();
      return;
    }

    closeAllSections();
    clearHashFromUrl();
  });
});
