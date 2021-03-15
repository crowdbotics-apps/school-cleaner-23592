import React from 'react';
import Cookies from 'js-cookie';

const csrfCookie = (name = 'csrftoken') => {
  return Cookies.get(name);
};

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfCookie} />
    );
};
export default CSRFToken;
