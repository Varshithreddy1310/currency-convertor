const dropdowns = document.querySelectorAll(".converter select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("button");
const fromCurr = document.querySelector('[name="from-select"]');
const toCurr = document.querySelector('[name="to-select"]');

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;
    select.append(option);
    if (select.name === "from-select" && currCode === "USD") {
      option.selected = "selected";
    } else if (select.name === "to-select" && currCode === "INR") {
      option.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

window.addEventListener("load", () => {
  udpdateAmt();
});

function updateFlag(select) {
  let currCode = select.value;
  let countryCode = countryList[currCode];
  let src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = select.parentElement.querySelector("img");
  img.src = src;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  udpdateAmt();
});

const udpdateAmt = async () => {
  const base = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = await data[base][to];
  console.log(response);
  console.log(data);
  console.log(rate);
  const amt = document.querySelector("input");
  const finalAmt = amt.value * rate;
  console.log(finalAmt);
  msg.innerText = `${amt.value} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
