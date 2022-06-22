const url = 'http://localhost:4000';

export const postTrade = async (prodId1, prodId2) => {
  try {
    const response = await fetch(url + '/api/trades/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        userProductionId_1: prodId1,
        userProductionId_2: prodId2,
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
