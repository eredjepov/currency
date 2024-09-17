const state = {
  firstCurrency: "USD",
  secondCurrency: "RUB",
};

const input = document.querySelector(".quantity");
const toGet = document.querySelector(".result");
const currencyButtons = document.querySelectorAll(
  ".column .currencies_wrapper button"
);
const toGetCurrency = document.querySelectorAll(
  ".column_second .currencies_wrapper button"
);

const presentCourse = document.querySelectorAll(".exchange_course");
const reverseButton = document.querySelector(".reverse");
const columns = document.querySelectorAll(".column");
const currencySelector = document.querySelector(".column_first select");

getCurrencies();
async function getCurrencies() {
  const response = await fetch(
    "https://openexchangerates.org/api/latest.json?app_id=e5f7bb3c257949999a103fc8fbaa7c15"
  );
  const data = await response.json();
  const result = await data;
  console.log(result);

  console.log(result.rates.AED);
  console.log(presentCourse.innerText);

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
    if (evt.target.parentElement.parentElement.classList.contains("first")) {
      state.firstCurrency = evt.target.innerText;
      presentCourse[0].innerText = `1 ${state.firstCurrency} = ${
        result.rates[state.firstCurrency]
      } ${state.secondCurrency}`;
    } else {
      state.secondCurrency = evt.target.innerText;
      presentCourse[1].innerText = `1 ${state.secondCurrency} = ${
        result.rates[state.secondCurrency]
      } ${state.firstCurrency}`;
    }
  }

  currencyButtons.forEach((el) => {
    el.addEventListener("click", (event) => {
      changeButtonsColor(event);
      showPresentCourse(event);
    });
  });

  currencySelector.addEventListener("change", (event) => {
    // console.log(event.target.parentElement.parentElement.classList);
    currencyButtons.forEach((button) => {
      button.classList.remove("active");
      event.target.classList.add("active");
      state.firstCurrency = button.value;
    });

    // console.log(event.target.value);
    state.firstCurrency = event.target.value;
    // console.log(state.firstCurrency);
    presentCourse.innerText = `1 ${state.firstCurrency} = ${
      result.rates[state.firstCurrency]
    }`;

    console.log(event);
  });

  input.addEventListener("input", (el) => {
    console.log(input.value);
    console.log(state.firstCurrency);
    console.log(result.rates[state.firstCurrency]);
    toGet.value =
      (parseFloat(input.value) / result.rates[state.firstCurrency]) *
      result.rates[state.secondCurrency];
    console.log(toGet.value);
  });

  reverseButton.addEventListener("click", () => {
    columns.forEach((column) => {
      if (column.classList.contains("order-1")) {
        column.classList.remove("order-1");
        column.classList.add("order-3");
      } else if (column.classList.contains("order-3")) {
        column.classList.remove("order-3");
        column.classList.add("order-1");
      }
    });
  });

  let mask = document.querySelector(".mask");

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
}

// window.addEventListener("load", () => {
//

// window.addEventListener("load", () => {
//   console.log(window);
//   console.log(window.load);
// });

// let time = window.performance;
// console.log(time);
// let pageloadtime = time.loadEventEnd - time.navigationStart;
// console.log(pageloadtime);
