const url = 'http://localhost:4000';

export const auth = async userInfos => {
  try {
    const response = await fetch(url + '/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfos),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
