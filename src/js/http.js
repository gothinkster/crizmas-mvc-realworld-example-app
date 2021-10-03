const headers = {
  'Content-Type': 'application/json;charset=utf-8'
};

const call = (path, method, data, queryObj) => {
  return fetch(`https://conduit.productionready.io/api/${path}${getQueryString(queryObj)}`, {
    method,
    mode: 'cors',
    body: data && JSON.stringify(data),
    headers
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }

    return response;
  });
};

const getQueryString = (queryObj) => {
  if (queryObj) {
    const entries = Object.entries(queryObj);

    if (entries.length) {
      return `?${entries.map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }).join('&')}`;
    }
  }

  return '';
};

export const get = (url, queryObj) => call(url, 'get', null, queryObj);

export const post = (url, data, queryObj) => call(url, 'post', data, queryObj);

export const put = (url, data, queryObj) => call(url, 'put', data, queryObj);

export const del = (url, queryObj) => call(url, 'delete', null, queryObj);

export const setAuthToken = (token) => {
  headers['Authorization'] = `Token ${token}`;
};

export const removeAuthToken = () => {
  delete headers['Authorization'];
};
