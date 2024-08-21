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
const column = document.querySelectorAll(".column");

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
        currencyButtons.forEach((button) => {
          button.classList.remove("active");
        });

        event.target.classList.add("active");
        presentCourse.innerText = `1 ${state.firstCurrency} = ${
          result.rates[state.firstCurrency]
        }`;
        state.firstCurrency = event.target.innerText;
      } else {
        currencyButtons.forEach((button) => {
          button.classList.remove("active");
        });

        event.target.classList.add("active");
        presentCourse.innerText = `1 ${state.firstCurrency} = ${
          result.rates[state.firstCurrency]
        }`;
        state.secondCurrency = event.target.innerText;
      }

      // console.log(state);
      // console.log(state.firstCurrency);
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
}

console.log(column);
reverseButton.addEventListener("click", (event) => {
  column.forEach((node) => {
    console.log(node.classList);
    if ((node.classList.value = "column column_first")) {
      node.classList.value = "column column_second";
      console.log(node.classList);
    }
    if ((node.classList.value = "column column_second")) {
      node.classList.value = "column column_first";
      console.log(node.classList);
    }
  });
  console.log(event.target);
  // console.log(event.target.parentElement.parentElement.previousElement);
  // console.log(event.target.previousElement);
  // if (
  //   event.target.parentElement.parentElement.parentElement.classList.contains(
  //     "column_first"
  //   )
  // ) {
  //   console.log(event.target.parentElement.parentElement.parentElement);
  //   event.target.parentElement.parentElement.parentElement.classList
  //     .toggle("column_first")
  //     .add("column_second");
  // }
  // // (
  // //   event.target.parentElement.parentElement.classList.contains("column_second")
  // // )
  // else {
  //   console.log(event.target.parentElement.parentElement.parentElement);
  //   event.target.parentElement.parentElement.parentElement.classList.toggle(
  //     "column_second"
  //   );
  // }
});
