const $ = (id) => document.getElementById(id);

function fmt(n) {
  return "€" + n.toFixed(2);
}

function calculate() {
  const diameterMm = parseFloat($("diameter").value) || 0;
  const depthMm = parseFloat($("depth").value) || 0;
  const quantity = parseFloat($("quantity").value) || 0;
  const pricePerCm3 = parseFloat($("pricePerCm3").value) || 0;
  const fixedCost = parseFloat($("fixedCost").value) || 0;
  const vatRate = parseFloat($("vatRate").value) || 0;
  const profit = parseFloat($("profitSlider").value) || 0;

  // Converter mm para cm (o preço é sempre por cm³)
  const radiusCm = diameterMm / 10 / 2;
  const depthCm = depthMm / 10;

  // Volume do cilindro: π * r² * profundidade
  const volumePerHole = Math.PI * Math.pow(radiusCm, 2) * depthCm;
  const totalVolume = volumePerHole * quantity;

  const materialCost = totalVolume * pricePerCm3;
  const totalFixedCost = fixedCost * quantity;

  const subtotal = materialCost + totalFixedCost;
  const profitAmount = subtotal * (profit / 100);
  const preVat = subtotal + profitAmount;
  const vatAmount = preVat * (vatRate / 100);
  const final = preVat + vatAmount;

  $("rVolume").textContent = volumePerHole.toFixed(3) + " cm³";
  $("rTotalVolume").textContent = totalVolume.toFixed(3) + " cm³";
  $("rMaterial").textContent = fmt(materialCost);
  $("rFixed").textContent = fmt(totalFixedCost);
  $("rSubtotal").textContent = fmt(subtotal);
  $("rProfit").textContent = fmt(profitAmount);
  $("rPreVat").textContent = fmt(preVat);
  $("rVat").textContent = fmt(vatAmount);
  $("rFinal").textContent = fmt(final);
  $("rProjectName").textContent = $("holeName").value.trim() || "Sem nome";

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  $("rPrintDate").textContent = `${day}/${month}/${year}`;
}

$("profitSlider").addEventListener("input", () => {
  $("profitValue").textContent = $("profitSlider").value;
  calculate();
});

document.querySelectorAll("input").forEach((input) => {
  if (input.id !== "profitSlider") {
    input.addEventListener("input", calculate);
  }
});

calculate();

$("printSummaryButton").addEventListener("click", () => {
  window.print();
});
