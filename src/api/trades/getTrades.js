const url = 'http://localhost:4000';

export const getTrades = async userProdId => {
  try {
    const response = await fetch(url + '/api/trades/' + userProdId);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
