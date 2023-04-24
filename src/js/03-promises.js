const collection = {
    form: document.querySelector('.form')
}

collection.form.addEventListener('submit', subForm)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({position, delay})
      } else {
        // Reject
        rej({position, delay})
      }
    }, delay)
  })
}


function subForm(elem){
    elem.preventDefault()
    const { delay, step, amount } = elem.target.elements;
    let total = Number(delay.value)

    for(let i = 1; i < amount.value; i++){
        createPromise(i, total)
        .then(({position, delay}) => {console.log(`Fulfilled promise ${position} in ${delay} ms`)})
        .catch(({position, delay}) => {console.log(`Rejected promise ${position} in ${delay} ms`)});

        total += Number(step.value)
    }
}