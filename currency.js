const state = {
  firstCurrency: "USD",
  secondCurrency: "RUB",
};

const input = document.querySelector(".quantity");
const toGet = document.querySelector(".result");
const currencyButtons = document.querySelectorAll(
  ".column .currencies_wrapper button"
);

const presentCourse = document.querySelectorAll(".exchange_course");
const reverseButton = document.querySelector(".reverse");
const columns = document.querySelectorAll(".column");
const currencySelectors = document.querySelectorAll(".calculator select");
const mask = document.querySelector(".mask");

getCurrencies();
async function getCurrencies() {
  const response = await fetch(
    "https://openexchangerates.org/api/latest.json?app_id=e5f7bb3c257949999a103fc8fbaa7c15"
  );
  const data = await response.json();
  const result = await data;
  console.log(result);

  console.log(result.rates.AED);

  function changeButtonsColor(evt) {
    const currentColumn = evt.target.closest(".column");
    if (!currentColumn) return;
    const currentColumnButtons = currentColumn.querySelectorAll("button");
    const currentColumnSelect = currentColumn.querySelector("select");
    currentColumnButtons.forEach((el) => {
      el.classList.remove("active");
    });
    currentColumnSelect.classList.remove("active");
    evt.target.classList.add("active");
  }

  function showPresentCourse(evt) {
    console.log(evt.target.value);
    if (evt.target.parentElement.parentElement.classList.contains("first")) {
      state.firstCurrency = evt.target.value;
    }
    if (evt.target.parentElement.parentElement.classList.contains("second")) {
      state.secondCurrency = evt.target.value;
    }
    presentCourse[0].innerText = `1 ${"USD"} = ${result.rates[
      state.firstCurrency
    ].toFixed(2)} ${state.firstCurrency}`;
    presentCourse[1].innerText = `1 ${"USD"} = ${result.rates[
      state.secondCurrency
    ].toFixed(2)} ${state.secondCurrency}`;
  }

  currencyButtons.forEach((el) => {
    el.addEventListener("click", (event) => {
      changeButtonsColor(event);
      showPresentCourse(event);
    });
  });

  currencySelectors.forEach((select) => {
    select.addEventListener("change", (event) => {
      console.log(event.target.value);
      changeButtonsColor(event);
      showPresentCourse(event);
      ////доделать
    });
  });

  input.addEventListener("input", (el) => {
    toGet.value.toFixed(2) =
      (parseFloat(input.value) / result.rates[state.firstCurrency]) *
      result.rates[state.secondCurrency];
    console.log(toGet.value);
  });

  input.addEventListener("input", (e) => {
    toGet.value =
      (parseFloat(input.value) / result.rates[state.firstCurrency]) *
      result.rates[state.secondCurrency];
  });

  reverseButton.addEventListener("click", () => {
    columns.forEach((column) => {
      if (column.classList.contains("order-1")) {
        column.classList.remove("order-1");
        column.classList.add("order-3");
      } else  {
        column.classList.remove("order-3");
        column.classList.add("order-1");
      }
    });
  });
}
//подскажи пожалуйста вариант краткой записи через тернарные операторы

let loadTime =
  window.performance.timing.domContentLoadedEventEnd -
  window.performance.timing.navigationStart;
console.log(loadTime);
if (loadTime >= 500) {
  mask.classList.add("appear");
  setTimeout(() => {
    mask.remove();
  }, 600);
} else {
  mask.remove();
}
