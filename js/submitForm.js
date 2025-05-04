import {
  sendData
} from './api.js';
import {
  closeFormModal
} from './form-modal.js';

export const handleFormSubmit = async (evt) => {
  evt.preventDefault();

  const form = evt.target;
  const formData = new FormData(form);
  try {
    await sendData(formData);
    closeFormModal();
  } catch (error) {

    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-message';
    errorMessage.textContent = 'Не удалось отправить форму. Попробуйте ещё раз.';
    form.appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  }
};
