const URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const httpMethods = {
  GET: 'GET',
  POST: 'POST'
};

const route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const errorText = {
  GET: 'ошибка получения данных',
  POST: 'ошибка отправки данных'
};

const load = async (path, method = httpMethods.GET, body = null) => {
  const response = await fetch(`${URL}${path}`, {
    method,
    body
  });
  return response.ok ? await response.json() : Promise.reject(errorText[method]);
};

export const getData = load(route.GET_DATA);

export const sendData = (formData) => load(route.SEND_DATA, httpMethods.POST, formData);
