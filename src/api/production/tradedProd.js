const url = 'http://localhost:4000';

export const tradedProd = async userId => {
  try {
    const response = await fetch(
      url + '/api/userProduction/' + userId + '/accepted'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
