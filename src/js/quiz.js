export default class Quiz {

  constructor(config) {
    this.q = config.q || []; //* Questions array in questions.js
    this.container = config.container; //* HtmlElement as container for the quiz cards
  }

  start(result_btn, show_result, warning_msg) {
    this.display()
    result_btn.style.setProperty("opacity", "100%", "important")
    show_result.style.setProperty("opacity", "0%", "important")
    warning_msg.style.setProperty("opacity", "0%", "important")
  }

  display() {

    let cards = ""
    this.container.innerHTML = ""
    let random_questions = [] //* It will content on 5 random question of q array.
    let first_random_index = Math.floor(Math.random() * this.q.length)
    random_questions.push({
      id: first_random_index,
      ...this.q[first_random_index]
    })
    let i = 1
    while (i < 5) {
      let random_index = Math.floor(Math.random() * this.q.length)
      let found = false
      for (let idx = 0; idx < random_questions.length; idx++) {
        if (random_questions[idx]["id"] === random_index) {
          found = true
          break;
        }
      }
      if (!found) {
        random_questions.push({
          id: random_index,
          ...this.q[random_index]
        })
        i++
      }
    }

    random_questions.forEach((item, index) => {  //* {id:index , question: "..." , options: { A: "...", B: "...", C: "..."} , answer: "..."} */
      cards += `      <div class="row w-100 d-flex justify-content-center align-items-center">
      <div class="col-10">
        <div class="card border-primary mb-3 w-100">
          <div class="card-header bg bg-info">Question-${index + 1}</div>
          <div class="card-body">
            <fieldset class="form-group">
              <legend class="ms-1 text-primary text-capitalize fs-6 fw-bold text-break font-monospace">
              ${item.question}
              </legend>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="${item.id}" id="option-1-q-${index + 1}" value="">
                <label class="form-check-label" for="option-1-q-${index + 1}">
                ${item.options["A"]}
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="${item.id}" id="option-2-q-${index + 1}" value="">
                <label class="form-check-label" for="option-2-q-${index + 1}">
                ${item.options["B"]}
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="${item.id}" id="option-3-q-${index + 1}" value="">
                <label class="form-check-label" for="option-3-q-${index + 1}">
                ${item.options["C"]}
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>`
    })
    this.container.innerHTML = cards;
  }

  check(inputsElem) {
    if (inputsElem !== null || inputsElem !== undefined) {
      let result = 0; //* Correct answers counter.

      inputsElem.forEach(input => {

        if (input.checked) {
          if (input.nextElementSibling.textContent.trim() === this.q[input.name]["answer"].trim()) {
            result++
            input.parentElement.parentElement.parentElement.previousElementSibling.style.setProperty("background-color", "#90EE90", "important");
          } else {
            input.parentElement.parentElement.parentElement.previousElementSibling.style.setProperty("background-color", "#ff0000", "important");
          }
          if (input.parentElement.parentElement.parentElement.querySelector("#show_correct_answer")) {
            false
          } else {
            let p = document.createElement('p')
            p.id = "show_correct_answer"
            p.textContent = `The correct answer ${this.q[input.name]["answer"].trim()}`
            p.style.marginLeft = "20px"
            p.style.color = "green";
            p.style.fontWeight = "bold"
            p.style.fontSize = "18px"
            input.parentElement.parentElement.parentElement.append(p)
          }
        }

      });
      return result
    }
  }

  result(inputsElem, show_result, warning_msg) {
    let checked = 0; //* How many radio buttons are selected for 5 questions?, should be (CHECKED = 5)
    if (inputsElem !== null || inputsElem !== undefined) {
      inputsElem.forEach(input => {
        if (input.checked) {
          checked++
        }
      });
    }
    if (checked === 5) {
      let result = this.check(inputsElem);
      show_result.innerHTML = `${result} / 5`
      warning_msg.style.setProperty("opacity", "0%", "important")
      show_result.style.setProperty("opacity", "100%", "important")
    } else {
      warning_msg.style.setProperty("opacity", "100%", "important")
    }
  }

}