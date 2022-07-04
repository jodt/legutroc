const url = 'http://localhost:4000';

export const addProd = async (userId, vegetable) => {
  try {
    const response = await fetch(url + '/api/userProduction/' + userId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vegetable),
    });
    if (response.ok) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
