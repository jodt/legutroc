const url = 'http://localhost:4000';

export const changeProductionStatus = async prodId => {
  try {
    const response = await fetch(
      url + '/api/userProduction/' + prodId + '/status',
      {
        method: 'PUT',
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
