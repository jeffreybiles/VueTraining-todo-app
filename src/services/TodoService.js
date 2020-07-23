import axios from 'axios'
    
const apiClient = axios.create({  
  baseURL: `http://localhost:3000`
})

export default {
  getAll() {
    return apiClient.get('/todos')
  },
  update(todo) {
    return apiClient.put(`/todos/${todo.id}`, todo)
  }
}