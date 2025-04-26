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
    console.log('Форма успешно отправлена!');
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};
