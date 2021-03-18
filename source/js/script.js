const feedbackForm = document.querySelector('.main-feedback__form');
const fields = feedbackForm.querySelectorAll('.feedback-field');
const fullname = feedbackForm.querySelector('[name=fullname]');
const phone = feedbackForm.querySelector('[name=phone]');

feedbackForm.addEventListener('submit', function (evt) {
  if (!fullname.value || !phone.value) {
    evt.preventDefault();
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (!field.value) {
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    }
  } 
});
