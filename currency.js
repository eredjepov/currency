const state = {
  firstCurrency: null,
  secondCurrency: null,
};

const input = document.querySelector(".quantity");
const toGet = document.querySelector(".result");
const currencyButtons = document.querySelectorAll(
  ".column .currencies_wrapper button"
);
const toGetCurrency = document.querySelectorAll(
  ".column_second .currencies_wrapper button"
);

const presentCourse = document.querySelector(".exchange_course");
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

  currencyButtons.forEach((el) => {
    el.addEventListener("click", (event) => {
      // console.log(el.value);

      console.log();
      if (
        event.target.parentElement.parentElement.parentElement.classList.contains(
          "column_first"
        )
      ) {
        currencySelector.classList.remove("active");
        currencyButtons.forEach((button) => {
          button.classList.remove("active");
        });

        event.target.classList.add("active");
        state.firstCurrency = event.target.innerText;
        presentCourse.innerText = `1 ${state.firstCurrency} = ${
          result.rates[state.firstCurrency]
        } ${state.secondCurrency}`;
      } else {
        console.log("HELLO!");
        currencyButtons.forEach((button) => {
          button.classList.remove("active");
        });

        event.target.classList.add("active");
        state.secondCurrency = event.target.innerText;
        presentCourse.innerText = `1 ${state.secondCurrency} = ${
          result.rates[state.secondCurrency]
        } ${state.firstCurrency}`;
      }
      console.log(presentCourse.innerText);
    });
  });

  // toGetCurrency.forEach((el) => {
  //   el.addEventListener("click", (event) => {
  //     toGetCurrency.forEach((button) => {
  //       button.classList.remove("active");
  //     });

  //     /// повторить методы toggle add remove
  //     event.target.classList.add("active");
  //     // console.log(event.target);
  //     state.secondCurrency = event.target.innerText;
  //     // console.log(state);
  //     // console.log(state.secondCurrency);
  //   });
  // });

  input.addEventListener("input", (e) => {
    toGet.value =
      (parseFloat(input.value) / result.rates[state.firstCurrency]) *
      result.rates[state.secondCurrency];
  });

  currencySelector.addEventListener("change", (event) => {
    // console.log(currencySelector);
    // console.log(event.target);

    currencyButtons.forEach((button) => {
      button.classList.remove("active");
      // button.onclick(() => {
      //   state.firstCurrency = event.target.innerText;
      // });
      event.target.classList.add("active");
      // console.log(button.value);
      state.firstCurrency = button.value;

      // console.log(event.target);
      // console.log(state.firstCurrency);
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
