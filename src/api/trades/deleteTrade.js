const url = 'http://localhost:4000';

export const deleteTrade = async tradeId => {
  try {
    const response = await fetch(url + '/api/trades/' + tradeId + '/delete', {
      method: 'delete',
    });
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};
