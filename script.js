// Toggle the visibility of the search bar
function toggleSearch() {
  const logo = document.getElementById("logoBox");
  const searchBox = document.getElementById("searchBox");

  if (searchBox && logo) {
    const isHidden = searchBox.style.display === "none" || searchBox.style.display === "";
    logo.style.display = isHidden ? "none" : "flex";
    searchBox.style.display = isHidden ? "flex" : "none";
  }
}

// Show or hide the clear (×) icon based on search input value
function toggleClearIcon() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");

  if (input && clearBtn) {
    clearBtn.style.display = input.value.length > 0 ? "inline" : "none";
  }
}

// Clear the search input and reset product filtering
function clearSearch() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");
  const cards = document.querySelectorAll(".product-card");

  if (input && clearBtn) {
    input.value = "";
    clearBtn.style.display = "none";
    input.focus();
  }

  cards.forEach(card => {
    card.classList.remove("hide");
  });
}

// Toggle the visibility of the drawer menu
function toggleDrawer() {
  const drawer = document.getElementById("drawerMenu");
  if (drawer) {
    drawer.style.right = drawer.style.right === "0px" ? "-270px" : "0px";
  }
}

// Restore previous scroll position when navigating back to a page
document.addEventListener("DOMContentLoaded", function () {
  const pageName = window.location.pathname.split("/").pop() || "home";
  const scrollKey = "scrollPos_" + pageName;
  const savedScrollPos = sessionStorage.getItem(scrollKey);

  if (savedScrollPos) {
    setTimeout(() => {
      window.scrollTo(0, parseInt(savedScrollPos));
      sessionStorage.removeItem(scrollKey);
    }, 100);
  }

  // Save scroll position before navigating away
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      sessionStorage.setItem(scrollKey, window.scrollY);
    });
  });

  // Setup live search filter
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");
  const cards = document.querySelectorAll(".product-card");

  if (input) {
    input.addEventListener("input", toggleClearIcon);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const query = input.value.trim().toLowerCase();
        if (clearBtn) {
          clearBtn.style.display = query ? "inline" : "none";
        }

        cards.forEach(card => {
          const title = card.getAttribute("data-title") || "";
          const match = title.toLowerCase().includes(query);
          card.classList.toggle("hide", !match);
        });
      }
    });
  }
});

// Hide search bar and icon on specific product pages
document.addEventListener("DOMContentLoaded", function () {
  const pageName = window.location.pathname.split("/").pop();

  const pagesToHideSearch = [
    "product1.html", "product2.html", "product3.html", "product4.html", "product5.html",
    "product6.html", "product7.html", "product8.html", "product9.html", "product10.html"
  ];

  if (pagesToHideSearch.includes(pageName)) {
    const searchBox = document.getElementById("searchBox");
    const searchIcon = document.querySelector(".icon-search");

    if (searchBox) searchBox.style.display = "none";
    if (searchIcon) searchIcon.style.display = "none";
  }
});