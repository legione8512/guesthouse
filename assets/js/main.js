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

  const roomsCardsContainer = document.getElementById("rooms-cards");
  const roomsListView = document.querySelector(".rooms-list-view");
  const roomGalleryView = document.getElementById("room-gallery-view");
  const roomThumbnailsContainer = document.getElementById("room-thumbnails");
  const roomsBackButton = document.querySelector(".rooms-back-button");
  const roomGalleryTitle = document.querySelector(".room-gallery-title");
  const roomGallerySubtitle = document.querySelector(".room-gallery-subtitle");

  const imageLightbox = document.querySelector(".image-lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPreviousButton = document.querySelector(".lightbox-prev");
  const lightboxNextButton = document.querySelector(".lightbox-next");

  let currentLightboxImages = [];
  let currentLightboxIndex = 0;

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

  // I reset the rooms section back to the room cards.
  function resetRoomsView() {
    if (!roomsListView || !roomGalleryView) {
      return;
    }

    roomsListView.hidden = false;
    roomGalleryView.hidden = true;
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

    if (sectionId === "#rooms") {
      resetRoomsView();
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

  // I show the current image inside the larger image view.
  function showCurrentLightboxImage() {
    if (
      !lightboxImage ||
      !lightboxCaption ||
      currentLightboxImages.length === 0
    ) {
      return;
    }

    const currentImage = currentLightboxImages[currentLightboxIndex];

    lightboxImage.src = currentImage.src;
    lightboxImage.alt =
      currentImage.alt || currentImage.caption || "Imagine galerie";
    lightboxCaption.textContent =
      currentImage.caption || currentImage.alt || "";
  }

  // I open the selected image in a larger view.
  function openImageLightbox(
    imageSrc,
    imageAlt,
    imageCaption,
    imageList,
    selectedIndex,
  ) {
    if (!imageLightbox || !lightboxImage || !lightboxCaption) {
      return;
    }

    if (Array.isArray(imageList) && imageList.length > 0) {
      currentLightboxImages = imageList.map(function (image, index) {
        return {
          src: image.src,
          alt: image.alt || imageCaption || "Imagine galerie",
          caption: image.caption || imageCaption || "Imagine " + (index + 1),
        };
      });

      currentLightboxIndex =
        typeof selectedIndex === "number" ? selectedIndex : 0;
    } else {
      currentLightboxImages = [
        {
          src: imageSrc,
          alt: imageAlt || imageCaption || "Imagine galerie",
          caption: imageCaption || imageAlt || "",
        },
      ];

      currentLightboxIndex = 0;
    }

    showCurrentLightboxImage();

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
    currentLightboxImages = [];
    currentLightboxIndex = 0;
  }

  // I move to the previous or next image in the current lightbox list.
  function moveLightboxImage(direction) {
    if (!imageLightbox || !imageLightbox.classList.contains("active")) {
      return;
    }

    if (currentLightboxImages.length <= 1) {
      return;
    }

    currentLightboxIndex =
      (currentLightboxIndex + direction + currentLightboxImages.length) %
      currentLightboxImages.length;

    showCurrentLightboxImage();
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
          openImageLightbox(
            galleryImage.src,
            galleryImage.alt,
            imageCaption,
            category.images,
            index,
          );
        },
      );

      card.classList.add("gallery-thumbnail-card");
      galleryThumbnailsContainer.appendChild(card);
    });
  }

  // I create one room card.
  function createRoomCard(roomKey, room) {
    const card = document.createElement("article");
    card.className = "room-card gallery-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    const image = document.createElement("img");
    image.src = room.cover;
    image.alt = room.title;
    image.loading = "lazy";

    const body = document.createElement("div");
    body.className = "room-card-body";

    const title = document.createElement("h3");
    title.textContent = room.title;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "action-button room-card-button";
    button.textContent = "Vezi poze";

    function openRoom() {
      renderRoomGallery(roomKey);
    }

    card.addEventListener("click", openRoom);

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openRoom();
      }
    });

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      openRoom();
    });

    body.appendChild(title);

    card.appendChild(image);
    card.appendChild(button);
    card.appendChild(body);

    return card;
  }

  // I show all room cards.
  function renderRooms() {
    if (!roomsCardsContainer || !window.roomsData) {
      return;
    }

    roomsCardsContainer.innerHTML = "";

    Object.keys(window.roomsData).forEach(function (roomKey) {
      const room = window.roomsData[roomKey];

      if (!room || !room.images || room.images.length === 0) {
        return;
      }

      const card = createRoomCard(roomKey, room);
      roomsCardsContainer.appendChild(card);
    });
  }

  // I show the photos for one selected room.
  function renderRoomGallery(roomKey) {
    if (
      !roomsListView ||
      !roomGalleryView ||
      !roomThumbnailsContainer ||
      !window.roomsData
    ) {
      return;
    }

    const room = window.roomsData[roomKey];

    if (!room || !room.images) {
      return;
    }

    roomsListView.hidden = true;
    roomGalleryView.hidden = false;

    if (roomGalleryTitle) {
      roomGalleryTitle.textContent = room.title;
    }

    if (roomGallerySubtitle) {
      roomGallerySubtitle.textContent = room.subtitle || "";
    }

    roomThumbnailsContainer.innerHTML = "";

    room.images.forEach(function (roomImage, index) {
      const imageCaption = room.title + " - imagine " + (index + 1);

      const roomLightboxImages = room.images.map(function (image, imageIndex) {
        return {
          src: image.src,
          alt: image.alt || room.title,
          caption: room.title + " - imagine " + (imageIndex + 1),
        };
      });

      const card = createGalleryCard(
        roomImage.src,
        roomImage.alt,
        imageCaption,
        function () {
          openImageLightbox(
            roomImage.src,
            roomImage.alt,
            imageCaption,
            roomLightboxImages,
            index,
          );
        },
      );

      card.classList.add("room-thumbnail-card");
      roomThumbnailsContainer.appendChild(card);
    });
  }

  renderGalleryCategories();
  renderRooms();

  if (galleryBackButton) {
    galleryBackButton.addEventListener("click", function () {
      resetGalleryView();
    });
  }

  if (roomsBackButton) {
    roomsBackButton.addEventListener("click", function () {
      resetRoomsView();
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", function () {
      closeImageLightbox();
    });
  }

  if (lightboxPreviousButton) {
    lightboxPreviousButton.addEventListener("click", function () {
      moveLightboxImage(-1);
    });
  }

  if (lightboxNextButton) {
    lightboxNextButton.addEventListener("click", function () {
      moveLightboxImage(1);
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
    if (imageLightbox && imageLightbox.classList.contains("active")) {
      if (event.key === "Escape") {
        closeImageLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        moveLightboxImage(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        moveLightboxImage(1);
        return;
      }
    }

    if (event.key === "Escape") {
      closeAllSections();
      clearHashFromUrl();
    }
  });
});
