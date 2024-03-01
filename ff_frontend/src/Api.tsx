const API_BASE_URL = 'http://localhost:3001';

export const getCountries = async (): Promise<any[]> => {
  const url = `${API_BASE_URL}/get-countries`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getUsers = async (): Promise<any[]> => {
  const url = `${API_BASE_URL}/get-users`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const createUser = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/add-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
};