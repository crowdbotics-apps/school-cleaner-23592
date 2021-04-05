import Cookies from 'js-cookie';

export const isLoggedIn = () => {
  const token = Cookies.get('token');
  return !!token;
};

export const getHeader = () => {
	return { 'headers': { 'Authorization': "Basic " + Cookies.get('token') } }
};