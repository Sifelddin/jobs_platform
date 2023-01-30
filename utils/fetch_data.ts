export const fetchData = async (url: string, data: any, method: string) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};
export const upload = async (url: string, data: any, method: string) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: data,
    });
    let result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};
