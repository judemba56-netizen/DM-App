// =======================
// VARIABLES
// =======================
let hasPaid = false; 
let dataBalance = 0;
let planPrice = 300;
let planData = 1000; // MB
let daysLeft = 0;
let history = [];
let userWallet = 1000; // virtual wallet ₦

// =======================
// ELEMENTS
// =======================
const statusEl = document.getElementById("status");
const dataEl = document.getElementById("data");
const messageEl = document.getElementById("message");
const daysLeftEl = document.getElementById("daysLeft");
const historyListEl = document.getElementById("historyList");
const planSelect = document.getElementById("planSelect");
const appEl = document.querySelector(".app");
const dataBar = document.getElementById("dataBar");
const daysBar = document.getElementById("daysBar");

// =======================
// FUNCTIONS
// =======================

function updatePlan() {
  let value = planSelect.value;
  if (value == "1") { planPrice = 300; planData = 1000; }
  else if (value == "3") { planPrice = 500; planData = 3000; }
  else if (value == "5") { planPrice = 800; planData = 5000; }

  if (!hasPaid) dataBalance = 0;
  updateUI();
}

function payNow() {
  if (userWallet < planPrice) {
    showMessage(`Insufficient balance! Wallet: ₦${userWallet}`, "red");
    return;
  }

  userWallet -= planPrice;
  hasPaid = true;
  dataBalance = planData;
  daysLeft = 7;
  showMessage(`Payment ₦${planPrice} successful! Wallet: ₦${userWallet}`, "green");
  updateUI();
}

function useData() {
  if (!hasPaid) {
    showMessage("Subscription expired. Please renew.", "red");
    return;
  }

  dataBalance -= 100;
  daysLeft -= 1;
  if (dataBalance < 0) dataBalance = 0;
  if (daysLeft < 0) daysLeft = 0;

  history.push(`Used 100MB, ${daysLeft} days left`);
  updateUI();
}

function showMessage(text, color) {
  messageEl.textContent = text;
  messageEl.style.color = color;
}

function updateUI() {
  if (!hasPaid) {
    statusEl.textContent = "Subscription expired";
    statusEl.style.color = "#f87171";
    dataEl.textContent = 0;
    daysLeftEl.textContent = 0;
    historyListEl.innerHTML = "";
    appEl.querySelector("button[onclick='useData()']").disabled = true;
    appEl.querySelector("button[onclick='useData()']").style.opacity = 0.6;
    dataBar.style.width = "0%";
    daysBar.style.width = "0%";
    return;
  }

  statusEl.textContent = "Peace Mode: Active";
  statusEl.style.color = "#4ade80";
  dataEl.textContent = dataBalance;
  daysLeftEl.textContent = daysLeft;

  appEl.querySelector("button[onclick='useData()']").disabled = false;
  appEl.querySelector("button[onclick='useData()']").style.opacity = 1;

  historyListEl.innerHTML = "";
  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    historyListEl.appendChild(li);
  });

  if (dataBalance > 500) showMessage("You're covered!", "green");
  else if (dataBalance > 0) showMessage("Low data, renewal soon", "orange");
  else showMessage("Renewing...", "red");

  // Update progress bars
  dataBar.style.width = `${(dataBalance / planData) * 100}%`;
  daysBar.style.width = `${(daysLeft / 7) * 100}%`;
}
updateUI();
