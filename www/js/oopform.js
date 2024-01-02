//@ts-check
function validate(form, notify = alerton, notifyoff = alertoff) {
  const arr = form.querySelectorAll('[data-required], [data-pattern], [data-step], [data-max], [data-min], [data-type]');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    validCheck(arr, notify);
    if (!form.checkValidity()) e.stopImmediatePropagation();
  }, true)
  arr.forEach(input => {
    input.addEventListener('input', function (e) {
      clearvalidationmsg(input, notifyoff);
      validCheck([input], notify);
    })
  })
}
function alerton(input, msg) {
  alert(msg);
}
function alertoff() { };
function clearvalidationmsg(input, notifyoff) {
  notifyoff(input);
  input.setCustomValidity('');
}
function validCheck(arr, notify) {
  let msg = '';
  arr.forEach((input, i) => {
    const { required, maxlength, pattern, step, max, min, type } = input.dataset;
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
        msg = max || 'The value provided exceeds restrictions!';
      } else if (input.validity.rangeUnderflow) {
        msg = min || 'The value provided is below minimum!';
      } else if (input.validity.tooLong) { //tooShort
        msg = maxlength || 'Character limit!';
      } else if (input.validity.typeMismatch) {/* for emails vs urls vs text */
        msg = type || "Invalid input type!";
      } else if (input.validity.stepMismatch) {/* for the number input */
        msg = step || "Invalid step!";
      }
      notify(input, msg);
    }
  });
}
/* HOw to use, input must have a data-mismatch prop to hold msg in cases of pattern mismatch.
   if you need custom validation on an input, add a create a customValidity prop on the inputobject and pass a function that checks the input and returns an appropriate msg */
module.exports = validate;