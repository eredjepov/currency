(async function initialize() {
  const state = {
    firstCurrency: "USD",
    secondCurrency: "RUB",
    apiResponse: {},
    isFirstRun: true,
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
  const cover = document.querySelector(".cover");

  async function getCurrencies() {
    const response = await fetch(
      "https://openexchangerates.org/api/latest.json?app_id=e5f7bb3c257949999a103fc8fbaa7c15"
    ).catch((error) => {
      cover.classList.add("appear");
    });

    const data = await response.json();
    const result = await data;
    return result;
  }

  const apiResponse = await getCurrencies();
  state.apiResponse = apiResponse;

  if (state.isFirstRun) {
    input.value = 1;
    toGet.value = (
      (parseFloat(input.value) / state.apiResponse.rates[state.firstCurrency]) *
      state.apiResponse.rates[state.secondCurrency]
    ).toFixed(2);
    state.isFirstRun = false;
  }

  function firstColumnCurrenciesValue() {
    return (
      state.apiResponse.rates[state.secondCurrency] /
      state.apiResponse.rates[state.firstCurrency]
    ).toFixed(2);
  }

  function secondColumnCurrenciesValue() {
    return (
      state.apiResponse.rates[state.firstCurrency] /
      state.apiResponse.rates[state.secondCurrency]
    ).toFixed(2);
  }

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
      state.firstCurrency = evt.target.value;
    }
    if (evt.target.parentElement.parentElement.classList.contains("second")) {
      state.secondCurrency = evt.target.value;
    }
    presentCourse[0].innerText = `1 ${
      state.firstCurrency
    } = ${firstColumnCurrenciesValue()} ${state.secondCurrency}`;
    presentCourse[1].innerText = `1 ${
      state.secondCurrency
    } = ${secondColumnCurrenciesValue()} ${state.firstCurrency}`;
  }

  function makeCalculation(evt, direction = false) {
    evt.target.parentElement.parentElement.classList.contains("column_first")
      ? (toGet.value = parseFloat(input.value) / secondColumnCurrenciesValue())
      : (input.value = parseFloat(toGet.value) / firstColumnCurrenciesValue());
  }

  currencyButtons.forEach((el) => {
    el.addEventListener("click", (event) => {
      changeButtonsColor(event);
      showPresentCourse(event);
      makeCalculation(event, (direction = false));
    });
  });

  currencySelectors.forEach((select) => {
    select.addEventListener("change", (event) => {
      changeButtonsColor(event);
      showPresentCourse(event);
      makeCalculation(event, (direction = false));
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
