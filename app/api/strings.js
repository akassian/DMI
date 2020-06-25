import axios from 'axios';

/**
 * sends GET request to /api/strings
 *
 * returns => {
 *  strings: [string1, string2, ...]
 * }
 */
const getStrings = async () => {
  const res = await axios({
    url: `/api/strings`,
    method: 'GET',
  });
  return res;
};

/*
 * sends POST request to /api/strings
 *
 * returns => {string}
 */

const addString = async formData => {
  const res = await axios({
    url: `/api/strings`,
    method: 'POST',
    data: { string: formData },
  });
  return res;
};

export { getStrings, addString };
