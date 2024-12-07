const allDays = document.querySelector(".days");
const submitBtn = document.querySelector("button.submit-btn");
const profitBox = document.querySelector(".profit-box");
const calcTotalProfit = document.querySelector("button.calculate");

const calculationsBox = document.querySelector(".calculation");

const MAX_RETURNS = 340;

const EHAB_PERC = 0.33;
const ALAA_PREC = 0.67;


submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const costsInput = document.querySelector("#cost").value;
  const returnsInput = document.querySelector("#returns").value;
  if (costsInput && returnsInput) {
    createDay(+costsInput, +returnsInput);
    document.querySelector("#cost").value = "";
    document.querySelector("#returns").value = "";
  }
});

function createDay(costs, returns) {
  if (returns > MAX_RETURNS) {
    returns = MAX_RETURNS;
  }

  let mostufa = Math.round(returns * 0.1);

  let profit = returns - costs - mostufa;

  let ehab = Math.round(profit * EHAB_PERC);
  let alaa = Math.round(profit * ALAA_PREC);

  let day = document.createElement("div");
  day.className = "day";

  let topReturns = document.createElement("div");
  topReturns.className = "returns";
  topReturns.textContent = returns;

  day.appendChild(topReturns);

  let bottomCosts = document.createElement("div");
  bottomCosts.className = "costs";
  bottomCosts.textContent = costs;
  bottomCosts.style.bottom = `10px`;

  day.appendChild(bottomCosts);

  let drawingArea = document.createElement("div");
  drawingArea.className = "drawing-area";

  drawingArea.style.height = `${profit + mostufa}px`;
  drawingArea.style.bottom = `25px`;

  let mostufaHTML = document.createElement("div");
  mostufaHTML.className = "mostufa flex-center border-2px thin";
  mostufaHTML.textContent = mostufa;
  mostufaHTML.title = "Mostufa: " + mostufa;
  mostufaHTML.setAttribute('value', mostufa)
  mostufaHTML.style.height = `${(mostufa / profit) * 100}%`;
  mostufaHTML.style.width = "100%";

  drawingArea.appendChild(mostufaHTML);

  let ehabHTML = document.createElement("div");
  ehabHTML.className = "ehab flex-center border-2px thin";
  ehabHTML.textContent = ehab;
  ehabHTML.title = "Ehab: " + ehab;
  ehabHTML.setAttribute('value', ehab)
  ehabHTML.style.height = `${(ehab / profit) * 100}%`;
  ehabHTML.style.width = "100%";

  drawingArea.appendChild(ehabHTML);

  let alaaHTML = document.createElement("div");
  alaaHTML.className = "alaa flex-center border-2px thin";
  alaaHTML.textContent = alaa;
  alaaHTML.title = "Alaa: " + alaa;
  alaaHTML.setAttribute('value', alaa)
  alaaHTML.style.height = `${(alaa / profit) * 100}%`;
  alaaHTML.style.width = "100%";

  drawingArea.appendChild(alaaHTML);

  day.appendChild(drawingArea);

  allDays.appendChild(day);
}

function sumArr(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += +arr[i].getAttribute('value');
  }
  return sum;
}

function calculateProfit(e, a, m) {
  if (e && a && m) {
    profitBox.innerHTML = "";

    let ehabProfit = document.createElement("div");
    ehabProfit.className = "ehab-profit";
    ehabProfit.textContent = "Ehab: " + e;
    profitBox.appendChild(ehabProfit);

    let alaaProfit = document.createElement("div");
    alaaProfit.className = "alaa-profit";
    alaaProfit.textContent = "Alaa: " + a;
    profitBox.appendChild(alaaProfit);

    let mostufaProfit = document.createElement("div");
    mostufaProfit.className = "mostufa-profit";
    mostufaProfit.textContent = "Mostufa: " + m;
    profitBox.appendChild(mostufaProfit);
  }
}

calcTotalProfit.addEventListener("click", () => {
  let sumEhab = sumArr(document.querySelectorAll('.ehab'))
  let sumAlaa = sumArr(document.querySelectorAll('.alaa'))
  let sumMost = sumArr(document.querySelectorAll('.mostufa'))

  calculateProfit(sumEhab, sumAlaa, sumMost);
});

calculationsBox.addEventListener("mouseenter", () => {
  calculationsBox.classList.remove("hidden");
});

calculationsBox.addEventListener("mouseleave", () => {
  calculationsBox.classList.add("hidden");
});
