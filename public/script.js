document.getElementById("scanButton").addEventListener("click", () => {
  const barcode = document.getElementById("barcodeInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!barcode) {
    resultDiv.innerHTML = "<p class='text-danger'>Please enter a barcode!</p>";
    return;
  }

  // Show a loading spinner
  resultDiv.innerHTML = "<div class='spinner-border text-primary' role='status'><span class='visually-hidden'>Loading...</span></div>";

  fetch(`/api/product/${barcode}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        resultDiv.innerHTML = `<p class="text-danger">${data.error}</p>`;
      } else {
        // Process and display the data
        const allergens = data.allergens ? data.allergens.split(",") : ["No allergens listed"];
        const image = data.image_url || "https://via.placeholder.com/150";
        let allergensHTML = allergens.map((allergen) => {
          return `<span class="badge bg-danger">${allergen}</span>`;
        }).join(" ");

        resultDiv.innerHTML = `
          <div class="card">
            <img src="${image}" class="card-img-top" alt="Product Image" />
            <div class="card-body">
              <h5 class="card-title">${data.product_name || "Unknown Product"}</h5>
              <p><strong>Allergens:</strong> ${allergensHTML}</p>
            </div>
          </div>
        `;
      }
    })
    .catch(() => {
      resultDiv.innerHTML = "<p class='text-danger'>Error fetching data. Try again!</p>";
    });
});
