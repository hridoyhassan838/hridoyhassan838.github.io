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
