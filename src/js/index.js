import '../css/bootstrap.min.css';
import '../css/style.css';
import Questions from './questions';
import Quiz from './quiz';

let result_btn = document.getElementById('result_btn');
let show_result = document.querySelector(`#show_result`);
let warning_msg = document.querySelector("#warning_msg");

console.log(warning_msg)

let quest = new Questions();

let quiz = new Quiz({
  q: quest.questions,
  container: document.getElementById('question-container'),
})


document.getElementById('start').addEventListener("click", function () {
  quiz.start(result_btn, show_result, warning_msg);
});


result_btn.addEventListener("click", function () {
  let inputsElem = document.querySelectorAll('.form-check-input') || null;
  quiz.result(inputsElem, show_result, warning_msg);
});
