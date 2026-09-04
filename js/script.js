const $ = (id) => document.getElementById(id);

let holes = [];

function addHole() {
  const diameter = parseFloat($("diameter").value) || 0;
  const depth = parseFloat($("depth").value) || 0;
  const quantity = parseFloat($("quantity").value) || 0;

  if (diameter <= 0 || depth <= 0 || quantity <= 0) {
    return;
  }

  holes.push({ diameter, depth, quantity });

  $("diameter").value = 0;
  $("depth").value = 0;
  $("quantity").value = 1;

  renderHoles();
  calculate();
}

function renderHoles() {
  const container = $("holesList");
  container.innerHTML = "";

  holes.forEach((hole, index) => {
    const item = document.createElement("div");
    item.className = "hole-item";
    item.innerHTML = `
      <span>Ø${hole.diameter}mm × ${hole.depth}mm — ${hole.quantity}x</span>
      <span class="remove-hole" data-index="${index}">remover</span>
    `;
    container.appendChild(item);
  });

  container.querySelectorAll(".remove-hole").forEach((el) => {
    el.addEventListener("click", () => {
      const index = parseInt(el.dataset.index);
      holes.splice(index, 1);
      renderHoles();
      calculate();
    });
  });
}

function fmt(n) {
  return "€" + n.toFixed(2);
}

function calculate() {
  let totalVolume = 0;
  let totalQuantity = 0;

  holes.forEach((hole) => {
    const radiusCm = hole.diameter / 10 / 2;
    const depthCm = hole.depth / 10;
    const volumePerHole = Math.PI * Math.pow(radiusCm, 2) * depthCm;
    totalVolume += volumePerHole * hole.quantity;
    totalQuantity += hole.quantity;
  });

  const pricePerCm3 = parseFloat($("pricePerCm3").value) || 0;
  const fixedCost = parseFloat($("fixedCost").value) || 0;
  const vatRate = parseFloat($("vatRate").value) || 0;
  const profit = parseFloat($("profitSlider").value) || 0;
  const distance = parseFloat($("distance").value) || 0;
  const TRAVEL_RATE_PER_KM = 0.16; // baseado em 8L/100km a 2€/L
  const travelCost = distance * TRAVEL_RATE_PER_KM;

  const materialCost = totalVolume * pricePerCm3;
  const totalFixedCost = fixedCost * totalQuantity;

  const subtotal = materialCost + totalFixedCost + travelCost;
  const profitAmount = subtotal * (profit / 100);
  const preVat = subtotal + profitAmount;
  const vatAmount = preVat * (vatRate / 100);
  const final = preVat + vatAmount;

  $("rTotalVolume").textContent = totalVolume.toFixed(3) + " cm³";
  $("rMaterial").textContent = fmt(materialCost);
  $("rFixed").textContent = fmt(totalFixedCost);
  $("rSubtotal").textContent = fmt(subtotal);
  $("rProfit").textContent = fmt(profitAmount);
  $("rPreVat").textContent = fmt(preVat);
  $("rVat").textContent = fmt(vatAmount);
  $("rFinal").textContent = fmt(final);
  $("rProjectName").textContent = $("holeName").value.trim() || "Sem nome";
  $("rTravel").textContent = fmt(travelCost);

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
$("addHoleButton").addEventListener("click", addHole);
