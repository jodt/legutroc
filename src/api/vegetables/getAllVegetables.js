const url = 'http://localhost:4000';

export const retrieveAllVegetables = async () => {
  try {
    const response = await fetch(url + '/api/vegetables');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
