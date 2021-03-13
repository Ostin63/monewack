const feedbackForm = modalFeedback.querySelector('.modal-feedback__form');
const fields = feedbackForm.querySelectorAll('.feedback-item__field');

feedbackForm.addEventListener('submit', function (evt) {
  if (!fullname.value || !email.value) {
    evt.preventDefault();
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (!field.value) {
        field.classList.add('field-error');
        modalFeedback.classList.remove('modal-error');
        modalFeedback.offsetWidth = modalFeedback.offsetWidth;
        modalFeedback.classList.add('modal-error');
      } else {
        field.classList.remove('field-error');
      }
    }
  } else {
    if (isStorageSupport) {
      localStorage.setItem('fullname', fullname.value);
    }
  }
});