let balanceShow = document.querySelector("#amount");
let input = document.querySelector("input");
let tbody = document.querySelector("tbody");

let balance = localStorage.getItem("balance") ? parseFloat(localStorage.getItem("balance")) : 2000;
let data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];

function deleteRow(index, beforeBalance) {
  balance = beforeBalance;
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("balance", balance);  
  renderLogs();
  showBalance(balance);
}

function renderLogs() {
  tbody.innerHTML = "";
  data.forEach((el, index) => {
    tbody.innerHTML += `
        <tr>
            <th>${index + 1}</th>
            <th>${el.beforeBalance}</th>
            <th>${el.logType}</th>
            <th>${el.logValue}</th>
            <th>${el.afterBalance}</th>
            <th><button class="btn btn-danger" onclick="deleteRow(${index},${el.beforeBalance})">del</button></th>
        </tr>
    `;
  });
}

renderLogs();

function showBalance(val) {
  balanceShow.innerHTML = val;
}

showBalance(balance);

function deposit() {
  let oBalance = balance;
  balance += +input.value;
  showBalance(balance);
  let rowObj = {
    beforeBalance: oBalance,
    logType: "deposit",
    logValue: +input.value,
    afterBalance: balance,
  };
  data.push(rowObj);
  localStorage.setItem("data", JSON.stringify(data)); 
  localStorage.setItem("balance", balance); 
  renderLogs();
}

function withdraw() {
  if (input.value > balance) {
    alert("Value is higher than balance");
  } else {
    let oBalance = balance;
    balance = balance - +input.value;
    let rowObj = {
      beforeBalance: oBalance,
      logType: "withdraw",
      logValue: +input.value,
      afterBalance: balance,
    };
    data.push(rowObj);
    localStorage.setItem("data", JSON.stringify(data)); 
    localStorage.setItem("balance", balance);
    renderLogs();
    showBalance(balance);
  }
}