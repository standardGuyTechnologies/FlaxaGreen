function alerton (input, msg){
  alert(msg);
}
function alertoff(){};
function clearvalidationmsg(input, notifyoff){
  notifyoff(input);
  input.setCustomValidity('');
}
function validate(arr, notify=alerton, notifyoff=alertoff){
  arr.forEach(input=> {
    clearvalidationmsg(input, notifyoff)/* hide validation msg b4 re-validating */
    if(!input.oninput) input.oninput = (evt) => {/* make keypress also hide validation msg */
      clearvalidationmsg(input, notifyoff);
      validCheck([input], notify);
      //if user switches page w/o at least validating, then this is not unmounted
    }
    if(!input.onblur) input.onblur = (evt) => {
      evt.preventDefault(); evt.stopImmediatePropagation();
      validCheck([input], notify);
    }
  })
  return new Promise((resolve, reject)=>{
    if (!arr.length) return resolve();
    let form = arr[0].form;
    validCheck(arr, notify);
    if(!form.checkValidity()) return reject('Please fill the form correctly');
    arr.forEach(input=> (input.onblur = input.oninput = null));//unmount if no error
    resolve();
  })
}
  function validCheck(arr, notify) {
    let msg = '';
    arr.forEach((input, i) => {
      /* todo change range to max, update all usages as well */
      const {required, pattern, step, range, min, type} = input.dataset;
      if (typeof input.customValidity == 'function') {
        msg = input.customValidity();
        input.setCustomValidity(msg);
      }
      if (!input.checkValidity()) {/* if invalid */
        if (input.validity.customError) {
          /* do nothing */
        } else if (input.validity.valueMissing) {
          msg = required || 'This field is required!';
        } else if (input.validity.patternMismatch) {
          msg = pattern || 'Input did not match requested pattern!';
        } else if (input.validity.rangeOverflow) {
          msg = range || 'The value provided exceeds restrictions!';
        } else if (input.validity.rangeUnderflow) {
          msg = min || 'The value provided is below minimum!';
        } else if (input.validity.tooLong) { //tooShort
          msg = length || 'Character limit!';
        } else if(input.validity.typeMismatch){/* for emails vs urls vs text */
          msg = type || "Invalid input type!";
        } else if (input.validity.stepMismatch){/* for the number input */
          msg = step || "Invalid step!";
        }
        notify(input, msg);
      }
    });
  }

/* 
    new validate(arr, notify, notifyoff).then(x=>{
      //continue with your work
    }).catch(x=>{})
    //the notify functions are custom used to display the problem to the user
 */
/* HOw to use, input must have a data-mismatch prop to hold msg in cases of pattern mismatch.
   if you need custom validation on an input, add a create a customValidity prop on the inputobject and pass a function that checks the input and returns an appropriate msg */
module.exports = validate;