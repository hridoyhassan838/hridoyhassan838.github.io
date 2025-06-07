//হেডারে সার্চ আইকন চাপলে, লোগো লুকিয়ে ফেলে এবং সার্চ বক্স দেখায়। আবার চাপলে উল্টোটা 
function toggleSearch() {
  const logo = document.getElementById("logoBox");
  const searchBox = document.getElementById("searchBox");
  if (searchBox && logo) {
    const isHidden = searchBox.style.display === "none" || searchBox.style.display === "";
    logo.style.display = isHidden ? "none" : "flex";
    searchBox.style.display = isHidden ? "flex" : "none";
  }
}



//যদি সার্চ ইনপুটে কিছু টাইপ করা হয়, তাহলে × (clear) বাটন দেখা যাবে
function toggleClearIcon() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");
  if (input && clearBtn) {
    clearBtn.style.display = input.value.length > 0 ? "inline" : "none";
  }
}




//× বাটনে ক্লিক করলে ইনপুট ফাঁকা হয় এবং সব প্রোডাক্ট (কার্ড) আবার দেখা যায়
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




//হ্যামবার্গার আইকনে ক্লিক করলে ড্রয়ার স্লাইড করে বের হয়, আবার চাপলে লুকায়
function toggleDrawer() {
  const drawer = document.getElementById("drawerMenu");
  if (drawer) {
    drawer.style.right = drawer.style.right === "0px" ? "-270px" : "0px";
  }
}



//নিচের সবকিছু DOM লোড হওয়ার পর চালু হবে
document.addEventListener("DOMContentLoaded", function () {
  // বর্তমান পেজের নাম বের করা
  const pageName = window.location.pathname.split("/").pop() || "home";
  const scrollKey = "scrollPos_" + pageName;

  // আগের স্ক্রল পজিশন রিস্টোর
  const savedScrollPos = sessionStorage.getItem(scrollKey);
  if (savedScrollPos) {
    setTimeout(() => {
      window.scrollTo(0, parseInt(savedScrollPos));
      sessionStorage.removeItem(scrollKey);
    }, 100);
  }

  // নতুন পেজে যাওয়ার আগে স্ক্রল পজিশন সেভ
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      sessionStorage.setItem(scrollKey, window.scrollY);
    });
  });

  // লাইভ সার্চ ইনপুট
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




  // নির্দিষ্ট কিছু প্রোডাক্ট পেজে সার্চ বক্স ও সার্চ আইকন লুকানো
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



//header Loader start
 document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-container").innerHTML = data;
    })
    .catch(error => {
      console.error("Header load failed:", error);
    });
});
//header Loader end


//Footer Loader start
 document.addEventListener("DOMContentLoaded", function () {
      fetch("footer.html")
        .then(response => response.text())
        .then(data => { document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => {
          console.error("Footer load failed:", error);
        });
    });
//Footer Loader end