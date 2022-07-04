const url = 'http://localhost:4000';

export const clearProd = async (userId, prodId) => {
  try {
    const response = await fetch(
      url + '/api/userProduction/' + userId + '/' + prodId,
      { method: 'delete' }
    );
  } catch (error) {
    console.log(error);
  }
};
