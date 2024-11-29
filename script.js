document.addEventListener("DOMContentLoaded", function () {
  // Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Dropdown Functionality
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event propagation
      dropdown.classList.toggle("open");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function () {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
  });

  // AJAX Page Loading
  function loadPage(pageUrl) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", pageUrl, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        // Insert the loaded content into the main section
        document.querySelector("main").innerHTML = xhr.responseText;

        // Reinitialize any necessary functionality for the newly loaded page
        if (pageUrl === "about.html") {
          initializeSlider(); // Reinitialize the About Us slider
        }

        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Reapply event listeners to section buttons and "Read More" buttons in the new content
        attachSectionButtonListeners();
        attachReadMoreListeners();
      } else {
        console.error(
          `Failed to load content from ${pageUrl}. Status: ` + xhr.status
        );
      }
    };

    xhr.onerror = function () {
      console.error("There was an error with the AJAX request.");
    };

    xhr.send();
  }

  // Attach event listeners to section buttons
  function attachSectionButtonListeners() {
    const sectionButtons = document.querySelectorAll(".section-button");
    sectionButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default action
        const pageUrl = this.getAttribute("data-page");
        if (pageUrl) {
          loadPage(pageUrl); // Load the page using AJAX
        }
      });
    });
  }

  // Attach event listeners to "Read More" buttons
  function attachReadMoreListeners() {
    const readMoreButtons = document.querySelectorAll(".read-more-btn");

    readMoreButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const page = this.getAttribute("data-page"); // Get the URL for the detailed post
        if (page) {
          loadPage(page); // Load the full page content using AJAX
        }
      });
    });
  }

  // Load the homepage content by default
  loadPage("home.html");

  // Attach listeners to the logo links and other nav items
  const navLinks = document.querySelectorAll(".logo a, .dropdown-content li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior
      const page = this.getAttribute("href").substring(1); // Get the page name without '#'
      const pageUrl = `${page}.html`; // Construct the URL
      loadPage(pageUrl); // Load the page using AJAX
    });
  });

  // Initially attach event listeners for section buttons and "Read More" buttons
  attachSectionButtonListeners();
  attachReadMoreListeners();
});

// Review form
function showForm() {
  document.getElementById("reviewForm").style.display = "block";
  document.getElementById("blur").style.display = "block";
}

function closeForm() {
  document.getElementById("reviewForm").style.display = "none";
  document.getElementById("blur").style.display = "none";
}

document.getElementById("submit").addEventListener("click", function () {
  document.getElementById("spinner").style.display = "block";
});

// JavaScript for About Us Slider Functionality
function initializeSlider() {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const images = document.querySelectorAll(".slider-image");
  const prevButton = document.querySelector(".slider-nav.prev");
  const nextButton = document.querySelector(".slider-nav.next");

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) currentIndex = images.length - 1;
    else if (index >= images.length) currentIndex = 0;
    else currentIndex = index;
    sliderWrapper.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  setInterval(() => showSlide(currentIndex + 1), 5000); // Auto-slide every 5 seconds
}
