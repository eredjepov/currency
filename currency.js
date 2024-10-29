(async function initialize() {
  const state = {
    firstCurrency: "USD",
    secondCurrency: "RUB",
    apiResponse: {},
  };

  const calculationInputs = document.querySelectorAll("input");
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

  async function getCurrencies() {
    const response = await fetch(
      "https://openexchangerates.org/api/latest.json?app_id=e5f7bb3c257949999a103fc8fbaa7c15"
    );
    const data = await response.json();
    const result = await data;
    console.log(result);

    console.log(result.rates.AED);
    return result;
  }

  const apiResponse = await getCurrencies();
  state.apiResponse = apiResponse;

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
    presentCourse[0].innerText = `1 ${state.firstCurrency} = ${(
      state.apiResponse.rates[state.secondCurrency] /
      state.apiResponse.rates[state.firstCurrency]
    ).toFixed(2)} ${state.secondCurrency}`;
    presentCourse[1].innerText = `1 ${state.secondCurrency} = ${(
      state.apiResponse.rates[state.firstCurrency] /
      state.apiResponse.rates[state.secondCurrency]
    ).toFixed(2)} ${state.firstCurrency}`;
  }

  function makeCalculation(evt) {
    // if (!toGet.value || !input.value) {
    //   return;
    // }
    evt.target.parentElement.parentElement.classList.contains("column_first")
      ? (toGet.value = (
          (parseFloat(input.value) /
            state.apiResponse.rates[state.firstCurrency]) *
          state.apiResponse.rates[state.secondCurrency]
        ).toFixed(2))
      : (input.value = (
          (parseFloat(toGet.value) /
            state.apiResponse.rates[state.secondCurrency]) *
          state.apiResponse.rates[state.firstCurrency]
        ).toFixed(2));
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
    });
  });

  calculationInputs.forEach((calculationInput) => {
    calculationInput.addEventListener("input", (event) => {
      makeCalculation(event);
    });
  });

  reverseButton.addEventListener("click", () => {
    columns.forEach((column) => {
      column.classList.toggle("order-1");
      column.classList.toggle("order-3");

      //НЕ УДАЛЯТЬ ТЕКСТ КОДА!!!! if (column.classList.contains("order-1")) {
      //   column.classList.remove("order-1");
      //   column.classList.add("order-3");
      // } else {
      //   column.classList.remove("order-3");
      //   column.classList.add("order-1");
      // }
    });
  });

  let loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;
  console.log(loadTime);

  loadTime >= 500
    ? (mask.classList.add("appear"),
      setTimeout(() => {
        mask.remove();
      }, 600))
    : mask.remove();
})();
