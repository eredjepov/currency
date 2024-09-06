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
    currencySelector.classList.remove("active");
    currencyButtons.forEach((button) => {
      button.classList.remove("active");
    });
    evt.target.classList.add("active");
  }

  function showPresentCourse(evt) {
    if (evt.target.parentElement.parentElement.classList.contains("1")) {
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
      // console.log(el.value);

      console.log();
      if (
        event.target.parentElement.parentElement.parentElement.classList.contains(
          "column_first"
        )
      ) {
        changeButtonsColor(event);
        showPresentCourse(event);
        // console.log(event.target.parentElement.parentElement.classList);
      } else {
        console.log("HELLO!");
        changeButtonsColor(event);
        showPresentCourse(event);
        // console.log(event.target.parentElement.parentElement.classList);
      }
    });
  });

  input.addEventListener("input", (e) => {
    toGet.value =
      (parseFloat(input.value) / result.rates[state.firstCurrency]) *
      result.rates[state.secondCurrency];
  });

  currencySelector.addEventListener("change", (event) => {
    currencyButtons.forEach((button) => {
      button.classList.remove("active");
      event.target.classList.add("active");
      state.firstCurrency = button.value;
    });

    console.log(event.target.value);
    state.firstCurrency = event.target.value;
    console.log(state.firstCurrency);
    presentCourse.innerText = `1 ${state.firstCurrency} = ${
      result.rates[state.firstCurrency]
    }`;

    // 1. перевод данного селекта в активное состояние
    // 2. убрать подсветку на соседних кнопках
    // 3. подключить выбранную валюту к расчету калькулятора
    console.log(event);
  });
}

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
