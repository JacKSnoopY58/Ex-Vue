// server/api/proxy.ts
import Cookies from 'js-cookie';

export default async function proxyApiRequest() {
  try {
    const apiUrl = 'http://localhost:3000/api/v1/product';
    const Token = Cookies.get('token');
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${Token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error proxying API request:', error);
    return { error: 'Internal Server Error' };
  }
}
