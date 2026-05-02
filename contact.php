<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

function clean_input($value) {
    return htmlspecialchars(trim($value ?? ""), ENT_QUOTES, "UTF-8");
}

$name = clean_input($_POST["name"] ?? "");
$phone = clean_input($_POST["phone"] ?? "");
$email = trim($_POST["email"] ?? "");
$preferredContact = clean_input($_POST["preferred_contact"] ?? "");
$arrivalDate = clean_input($_POST["arrival_date"] ?? "");
$departureDate = clean_input($_POST["departure_date"] ?? "");
$guests = clean_input($_POST["guests"] ?? "");
$rooms = clean_input($_POST["rooms"] ?? "");
$message = clean_input($_POST["message"] ?? "");

if (
    $name === "" ||
    $phone === "" ||
    $preferredContact === "" ||
    $arrivalDate === "" ||
    $departureDate === "" ||
    $guests === "" ||
    $rooms === ""
) {
    echo "Vă rugăm să completaţi toate câmpurile obligatorii.";
    exit;
}

if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Adresa de email nu este validă.";
    exit;
}

/*
  Schimbă adresa de mai jos cu emailul real al pensiunii.
  Exemplu: rezervari@pensiuneadona.ro
*/
$to = "marius.robert@gmail.com";

$subject = "Cerere rezervare - Pensiunea DONA";

$emailBody = "A fost trimisă o nouă cerere de rezervare:\n\n";
$emailBody .= "Nume: $name\n";
$emailBody .= "Telefon: $phone\n";
$emailBody .= "Email: " . ($email !== "" ? $email : "Nu a fost completat") . "\n";
$emailBody .= "Prefer contact: $preferredContact\n";
$emailBody .= "Data sosirii: $arrivalDate\n";
$emailBody .= "Data plecării: $departureDate\n";
$emailBody .= "Număr persoane: $guests\n";
$emailBody .= "Număr camere: $rooms\n\n";
$emailBody .= "Mesaj:\n$message\n";

$headers = "From: Website Pensiunea DONA <no-reply@donasinaia.ro>\r\n";
$headers .= "Reply-To: " . ($email !== "" ? $email : $to) . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $emailBody, $headers)) {
    header("Location: index.html?sent=1#contact");
    exit;
} else {
    echo "Cererea nu a putut fi trimisă. Vă rugăm să încercaţi din nou sau să ne contactaţi telefonic.";
    exit;
}
// I check if the contact form was sent successfully.
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const formWasSent = params.get("sent") === "1";

  if (!formWasSent) {
    return;
  }

  const contactSection = document.getElementById("contact");

  if (!contactSection) {
    return;
  }

  const contactButton = document.querySelector('[data-section="contact"]');

  if (contactButton) {
    contactButton.click();
  } else {
    contactSection.classList.add("active");
  }

  const sectionContent =
    contactSection.querySelector(".section-content") || contactSection;

  const existingMessage = contactSection.querySelector(".form-success-message");

  if (!existingMessage) {
    const successMessage = document.createElement("div");
    successMessage.className = "form-success-message";
    successMessage.setAttribute("role", "status");
    successMessage.textContent =
      "Cererea a fost trimisă cu succes. Vă vom contacta cât mai curând.";

    sectionContent.prepend(successMessage);
  }

  history.replaceState(null, "", "index.html#contact");
});
?>
