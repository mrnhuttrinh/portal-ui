import moment from 'moment';
import URLSearchParams from 'url-search-params';
import numeral from 'numeral';
import { getItem } from './localItem';
import { getI18n } from 'react-i18next/dist/commonjs/context';

export const dateFormatter = (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A');
export const dateTimeFormatter = (date) => (date ? moment(date).format('hh:mm:ss DD/MM/YYYY') : 'N/A');

export const parseParams = (pageable, sort, search) => {
  const params = {...pageable, sort:`${sort.key},${sort.type}`};
  const searchParams = new URLSearchParams(params);
  if(search.value) {
    [].concat(search.value).forEach((value) => {
      searchParams.append(search.key, value);
    });
  }
  return searchParams.toString();
}

export const genderFormatter = (value) => {
  const GENDER = {
    0: 'Nữ',
    1: 'Nam',
    2: 'Khác',
  };
  return GENDER[value];
}

export const parseStringToObjectJson = (string) => {
  try {
    return JSON.parse(string);
  } catch (error) {
    
  }
  return {};
}

export const formatCurrency = (value) => {
  const language = getItem('language');
  if (language === 'vi' || language === 'VI') {
    return numeral(value).format('0,0');
  }
  return numeral(value).format('0,0.00');
}