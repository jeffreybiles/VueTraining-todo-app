import axios from 'axios'
    
const apiClient = axios.create({  
  baseURL: `http://localhost:3000`
})

export default {
  async getTodos() {
    let response = await apiClient.get('/todos')
    return response.data;
  }
}