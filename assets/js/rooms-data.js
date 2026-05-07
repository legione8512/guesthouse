// I keep the room images in one simple place.
window.roomsData = {
  room2: {
    title: "Camera 2",
    subtitle: "Cameră dublă cu balcon",
    cover:
      "assets/images/gallery/camere/Camera 2, dubla, pat matrimonial, cu balcon/1.jpeg",
    images: [
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
      "4.jpeg",
      "5.jpeg",
      "6.jpeg",
      "7.jpeg",
      "Balcon.jpeg",
    ].map(function (fileName) {
      return {
        src:
          "assets/images/gallery/camere/Camera 2, dubla, pat matrimonial, cu balcon/" +
          fileName,
        alt: "Camera 2 la Pensiunea DONA",
      };
    }),
  },

  room3: {
    title: "Camera 3",
    subtitle: "Cameră triplă cu balcon",
    cover:
      "assets/images/gallery/camere/Camera 3, tripla, pat matrimonial si unul de o persoana, cu balcon/1.jpeg",
    images: [
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
      "4.jpeg",
      "5.jpeg",
      "6.jpeg",
      "7.jpeg",
      "8.jpeg",
      "9.jpeg",
    ].map(function (fileName) {
      return {
        src:
          "assets/images/gallery/camere/Camera 3, tripla, pat matrimonial si unul de o persoana, cu balcon/" +
          fileName,
        alt: "Camera 3 la Pensiunea DONA",
      };
    }),
  },

  room4: {
    title: "Camera 4",
    subtitle: "Cameră dublă fără balcon",
    cover:
      "assets/images/gallery/camere/Camera 4, dubla, pat matrimonial, fara balcon/1.jpeg",
    images: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"].map(
      function (fileName) {
        return {
          src:
            "assets/images/gallery/camere/Camera 4, dubla, pat matrimonial, fara balcon/" +
            fileName,
          alt: "Camera 4 la Pensiunea DONA",
        };
      },
    ),
  },

  room5: {
    title: "Camera 5",
    subtitle: "Cameră dublă cu balcon",
    cover:
      "assets/images/gallery/camere/Camera 5, dubla, pat matrimonial, cu balcon/1.jpeg",
    images: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"].map(
      function (fileName) {
        return {
          src:
            "assets/images/gallery/camere/Camera 5, dubla, pat matrimonial, cu balcon/" +
            fileName,
          alt: "Camera 5 la Pensiunea DONA",
        };
      },
    ),
  },

  room6: {
    title: "Camera 6",
    subtitle: "Cameră dublă fără balcon",
    cover:
      "assets/images/gallery/camere/Camera 6, dubla, pat matrimonial, fara balcon/1.jpeg",
    images: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"].map(function (fileName) {
      return {
        src:
          "assets/images/gallery/camere/Camera 6, dubla, pat matrimonial, fara balcon/" +
          fileName,
        alt: "Camera 6 la Pensiunea DONA",
      };
    }),
  },

  room7: {
    title: "Camera 7",
    subtitle: "Apartament de 5 locuri",
    cover:
      "assets/images/gallery/camere/Camera 7, apartament 5 locuri, fara balcon/1.jpeg",
    images: [
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
      "4.jpeg",
      "5.jpeg",
      "6.jpeg",
      "7.jpeg",
      "8.jpeg",
      "9.jpeg",
      "10.jpeg",
      "11.jpeg",
    ].map(function (fileName) {
      return {
        src:
          "assets/images/gallery/camere/Camera 7, apartament 5 locuri, fara balcon/" +
          fileName,
        alt: "Camera 7 la Pensiunea DONA",
      };
    }),
  },

  room8: {
    title: "Camera 8",
    subtitle: "Cameră dublă fără balcon",
    cover:
      "assets/images/gallery/camere/Camera 8. dubla, pat matrimonial, fara balcon/1.jpeg",
    images: ["1.jpeg", "2.jpeg", "3.jpeg"].map(function (fileName) {
      return {
        src:
          "assets/images/gallery/camere/Camera 8. dubla, pat matrimonial, fara balcon/" +
          fileName,
        alt: "Camera 8 la Pensiunea DONA",
      };
    }),
  },
};
