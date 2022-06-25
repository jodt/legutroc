const url = 'http://localhost:4000';

export const acceptedTrade = async tradeId => {
  try {
    const response = await fetch(url + '/api/trades/' + tradeId + '/status', {
      method: 'PUT',
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
