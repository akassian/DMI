import axios from 'axios';

/**
 * getStrings
 *
 * returns => {
 *  strings: [{array of string data}]
 * }
 */
const getStrings = async () => {
  const res = await axios({
    url: `/api/strings`,
    method: 'GET',
  });
  return res;
};

export { getStrings };
