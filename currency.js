const state = {
  firstCurrency: null,
  secondCurrency: null,
};

const input = document.querySelector(".quantity");
const toGet = document.querySelector(".result");
const currencyButtons = document.querySelectorAll(
  ".column_first .currencies_wrapper button"
);
const toGetCurrency = document.querySelectorAll(
  ".column_second .currencies_wrapper button"
);

getCurrencies();
async function getCurrencies() {
  const response = await fetch(
    "https://openexchangerates.org/api/latest.json?app_id=e5f7bb3c257949999a103fc8fbaa7c15"
  );
  const data = await response.json();
  const result = await data;
  console.log(result);

  console.log(result.rates.AED);

  currencyButtons.forEach((el) => {
    el.addEventListener("click", (event) => {
      // console.log(el.value);
      currencyButtons.forEach((button) => {
        button.classList.remove("active");
      });

      /// повторить методы toggle add remove
      event.target.classList.add("active");
      // console.log(event.target);
      state.firstCurrency = event.target.innerText;
      // console.log(state);
      // console.log(state.firstCurrency);
    });
  });

  toGetCurrency.forEach((el) => {
    el.addEventListener("click", (event) => {
      toGetCurrency.forEach((button) => {
        button.classList.remove("active");
      });

      /// повторить методы toggle add remove
      event.target.classList.add("active");
      // console.log(event.target);
      state.secondCurrency = event.target.innerText;
      // console.log(state);
      // console.log(state.secondCurrency);
    });
  });
}

input.oninput = function () {
  console.log("Changed!!!");
  toGet.value =
    (parseFloat(input.value) / result.rates[state.firstCurrency]) *
    result.rates[secondCurrency];
};
