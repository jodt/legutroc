const url = 'http://localhost:4000';

export const createUser = async userInfos => {
  try {
    const response = await fetch(url + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfos),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
