//variables
var dynamic_style_changer = document.querySelectorAll(
  `input[name="color"], #display-font, #display-font-size`
);
var font = document.querySelector(`#display-font`);
var font_size = document.querySelector(`#display-font-size`);
var color = document.querySelector(`input[name="color"]:checked`);
var board_size = document.querySelector(`#board-size`);
var output_display = document.querySelector(`#output-display tr`);
var update_button = document.querySelector(`#update-button`);
var call_button = document.querySelector(`#call-button`);
var reset_button = document.querySelector(`#reset-button`);
var previous_board_val = board_size.value;
var current_bingo = [];
var calls = document.querySelector(`#calls`);
var calls_count = 0;

//statements

initialize();

multi_event(`change`, board_size, change_board_size);
update_button.addEventListener(`click`, fill_board);
reset_button.addEventListener(`click`, render_defaults);
call_button.addEventListener(`click`, bingo_call);

// Functions
function change_style() {
  var bingo_items = document.querySelectorAll(".bingo-item");
  color = document.querySelector(`input[name="color"]:checked`);
  bingo_items.forEach((item) => {
    item.style.color = color.value;
    item.style.fontFamily = font.value;
    item.style.fontSize = font_size.value;
  });
}

function render_defaults() {
  board_size.value = 10;
  document.querySelector(`#display-font option[value="Arial"]`).selected =
    "seleceted";
  document.querySelector(
    `#display-font-size option[value="20px"]`
  ).selected = `selected`;
  document.querySelector(`#red`).checked = "checked";
  document.querySelector(`#calls`).innerHTML = ``;

  fill_board();
}

function change_board_size() {
  if (!(board_size.value >= 4 && board_size.value <= 21)) {
    alert(
      `Size must be greater than or equal to 4 and smaller than or equal to 21`
    );
    board_size.value = previous_board_val;
    return;
  }
  previous_board_val = board_size.value;
}

function fill_board() {
  var result = ``;
  current_bingo = [];
  for (let i = 0; i < board_size.value; i++) {
    let rand = random_number(board_size.value);
    result += `<td class='bingo-item'>${rand}</td>`;
    current_bingo.push(rand);
  }
  output_display.innerHTML = result;
  document.querySelector(`#calls`).innerHTML = ``;
  change_style();
}

function bingo_call() {
  let rand = random_number(board_size.value);
  let calls_color = rgb();
  calls.innerHTML += `<div style="color:${calls_color}">${rand}</div>`;

  document.querySelectorAll(".bingo-item").forEach((item) => {
    if (item.innerHTML == rand) {
      item.classList.add("blue");
      calls_count++;
    }
  });

  let is = catch_bingo();
  console.log(is);
  if (is.isbingo && is.isbingo != null) {
    display_bingo(is.firstbingo);
  }
}

function catch_bingo() {
  var start_count = 0;
  var count = 0;
  var isbingo = false;
  var result = new Object();
  var arr = [];
  result.isbingo = false;

  document.querySelectorAll(`.bingo-item`).forEach((item) => {
    arr.push(item.classList.contains(`blue`));
  });

  for (let i = 0; i < arr.length - 5; i++) {
    if (arr[i]) {
    
      for (let j = i; j < i + 5; j++) {        
        if (!arr[j]) break;
        if (j == i + 4) {        
          result.isbingo = true;
          result.firstbingo = i;
          return result;
        }
      }
    }
    if (i == arr.length - 6) {

      result.isbingo = false;
      result.firstbingo = null;
      return result;
    }
  }
}

function display_bingo(firstbingo) {  
  let bingos = document.querySelectorAll(".bingo-item");
  for (let i = firstbingo; i < firstbingo + 5; i++) {
    bingos[i].classList.add("magenta");
  }
  //outputs calls count

  document.querySelector(`#calls-count`).innerHTML = `${calls_count} Calls`;

  //hides buttons
  document.querySelector(`#buttons`).style.display = "none";

  //shows bingo image
  setTimeout(() => {
    document.querySelector(`#bingo-svg`).style.display = "inline-block";
  }, 1500);
}

function rgb() {
  var rgb_val = [
    random_number(255),
    random_number(255),
    random_number(255),
  ].join(", ");
  return `rgb(${rgb_val})`;
}

function random_number(max) {
  return Math.ceil(Math.random() * 100000) % max;
}

function multi_event(events, element, func) {
  events = events.split(" ");
  for (let i = 0; i < events.length; i++) {
    element.addEventListener(events[i], func);
  }
}

function initialize() {
  render_defaults();
  fill_board();
  setDynamicStyleEvent();
  change_style();
}

function setDynamicStyleEvent() {
  dynamic_style_changer.forEach((single) => {
    multi_event(`change keyup`, single, change_style);
  });
}

function applyMultiStyle(elements, style) {
  elements.forEach((single) => {});
}
