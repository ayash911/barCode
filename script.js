let debounceTimer,
  label = "";

function generateBarcode(text) {
  JsBarcode(document.getElementById("barcodeSVG"), text, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 60,
    displayValue: true,
    text: label,
  });
}

function handleInputChange() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const input = document.getElementById("barcodeInput").value;
    if (input) generateBarcode(input);
    else {
      document.getElementById("barcodeSVG").innerHTML = "";
    }
  }, 0);
}

function clearBtn() {
  document.getElementById("barcodeInput").value = "";
  document.getElementById("barcodeSVG").innerHTML = "";
  label = "";
}

function promptLabel() {
  label = prompt("Enter a label for the barcode:") || "";
  const input = document.getElementById("barcodeInput").value;
  if (input) generateBarcode(input);
}

function downloadBarcode() {
  const inputValue = document.getElementById("barcodeInput").value;
  if (!inputValue) {
    alert("Please input something first");
    return;
  }

  const svgData = new XMLSerializer().serializeToString(
    document.getElementById("barcodeSVG")
  );
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = label ? `${label}.svg` : "barcode.svg";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js";
  script.onload = () => console.log("JsBarcode library loaded.");
  document.body.appendChild(script);
});
