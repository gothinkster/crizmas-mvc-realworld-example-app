export const toJson = (response) => response.json();

export const getResponseErrors = (response) => {
  return response.json().then(({errors}) => {
    return Promise.reject(Object.entries(errors).map(([key, value]) => `${key} ${value}`));
  });
};
