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

  const galleryCategoriesContainer =
    document.getElementById("gallery-categories");
  const galleryCategoryView = document.querySelector(".gallery-category-view");
  const galleryAlbumView = document.getElementById("gallery-album-view");
  const galleryThumbnailsContainer =
    document.getElementById("gallery-thumbnails");
  const galleryBackButton = document.querySelector(".gallery-back-button");
  const galleryAlbumTitle = document.querySelector(".gallery-album-title");
  const galleryAlbumDescription = document.querySelector(
    ".gallery-album-description",
  );

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

  // I reset the gallery back to the four main categories.
  function resetGalleryView() {
    if (!galleryCategoryView || !galleryAlbumView) {
      return;
    }

    galleryCategoryView.hidden = false;
    galleryAlbumView.hidden = true;
  }

  // I open the selected section.
  function openSection(sectionId) {
    closeAllSections();

    const selectedSection = document.querySelector(sectionId);

    if (selectedSection) {
      selectedSection.classList.add("active");
      document.body.classList.add("section-open", "is-article-visible");
    }

    if (sectionId === "#gallery") {
      resetGalleryView();
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

  // I open the selected gallery image in a larger view.
  function openImageLightbox(imageSrc, imageAlt, imageCaption) {
    if (!imageLightbox || !lightboxImage || !lightboxCaption) {
      return;
    }

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt || imageCaption || "Imagine galerie";
    lightboxCaption.textContent = imageCaption || imageAlt || "";

    imageLightbox.classList.add("active");
    imageLightbox.setAttribute("aria-hidden", "false");
  }

  // I close the larger image view.
  function closeImageLightbox() {
    if (!imageLightbox || !lightboxImage || !lightboxCaption) {
      return;
    }

    imageLightbox.classList.remove("active");
    imageLightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
  }

  // I create one reusable gallery card.
  function createGalleryCard(imageSrc, imageAlt, captionText, clickHandler) {
    const card = document.createElement("figure");
    card.className = "gallery-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    const image = document.createElement("img");
    image.src = imageSrc;
    image.alt = imageAlt || captionText || "Imagine galerie";
    image.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.textContent = captionText;

    card.appendChild(image);
    card.appendChild(caption);

    card.addEventListener("click", clickHandler);

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        clickHandler();
      }
    });

    return card;
  }

  // I show the four main gallery categories.
  function renderGalleryCategories() {
    if (!galleryCategoriesContainer || !window.galleryData) {
      return;
    }

    galleryCategoriesContainer.innerHTML = "";

    Object.keys(window.galleryData).forEach(function (categoryKey) {
      const category = window.galleryData[categoryKey];

      if (!category || !category.images || category.images.length === 0) {
        return;
      }

      const coverImage = category.cover || category.images[0].src;

      const card = createGalleryCard(
        coverImage,
        category.title,
        category.title,
        function () {
          renderGalleryAlbum(categoryKey);
        },
      );

      card.classList.add("gallery-category-card");
      galleryCategoriesContainer.appendChild(card);
    });
  }

  // I show the thumbnails inside one selected gallery category.
  function renderGalleryAlbum(categoryKey) {
    if (
      !galleryCategoryView ||
      !galleryAlbumView ||
      !galleryThumbnailsContainer ||
      !window.galleryData
    ) {
      return;
    }

    const category = window.galleryData[categoryKey];

    if (!category || !category.images) {
      return;
    }

    galleryCategoryView.hidden = true;
    galleryAlbumView.hidden = false;

    if (galleryAlbumTitle) {
      galleryAlbumTitle.textContent = category.title;
    }

    if (galleryAlbumDescription) {
      galleryAlbumDescription.textContent = category.description || "";
    }

    galleryThumbnailsContainer.innerHTML = "";

    category.images.forEach(function (galleryImage, index) {
      const imageCaption =
        galleryImage.caption || category.title + " " + (index + 1);

      const card = createGalleryCard(
        galleryImage.src,
        galleryImage.alt,
        imageCaption,
        function () {
          openImageLightbox(galleryImage.src, galleryImage.alt, imageCaption);
        },
      );

      card.classList.add("gallery-thumbnail-card");
      galleryThumbnailsContainer.appendChild(card);
    });
  }

  renderGalleryCategories();

  if (galleryBackButton) {
    galleryBackButton.addEventListener("click", function () {
      resetGalleryView();
    });
  }

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
