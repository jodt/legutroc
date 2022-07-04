const url = 'http://localhost:4000';

export const search = async (userCity, vegetable) => {
  try {
    const response = await fetch(
      url +
        '/api/userProduction/search?city=' +
        userCity +
        '&vegetable=' +
        vegetable
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
