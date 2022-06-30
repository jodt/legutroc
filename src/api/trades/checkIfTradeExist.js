const url = 'http://localhost:4000';

export const checkIfTradeExist = async (productId1, productId2) => {
  try {
    const response = await fetch(url + '/api/trades/exist', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        production1: productId1,
        production2: productId2,
      }),
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
