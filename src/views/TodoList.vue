<template>
  <div class="todo-list">
    <form @submit.prevent="addTodo">
      <input v-model="newTodoText" />
      <input type="submit" value="Create Todo" />
    </form>
    <div class="error">{{error}}</div>
    <p>{{todosRemaining}} incomplete todos remaining</p>
    <button @click="isFilteringTodos = !isFilteringTodos">
      {{isFilteringTodos ? 'Stop' : 'Start'}} filtering todos
    </button>
    <ul>
      <li v-for="todo in filteredTodos"
          :key="todo.id" 
          :class="{'done': todo.done}"
          @click="toggleDone(todo)">
        {{todo.text}}
        <button @click="deleteTodo(todo)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import TodoService from '@/services/TodoService'
  
  export default {
    data() {
      return {
        newTodoText: '',
        error: '',
        isFilteringTodos: false,
        todos: []
      }
    },
    async created(){
      let response = await TodoService.getAll();
      this.todos = response.data
    },
    computed: {
      todosRemaining(){
        return this.todos.filter(t => !t.done).length
      },
      filteredTodos(){
        return this.isFilteringTodos ? this.todos.filter(t => !t.done) : this.todos
      }
    },
    methods: {
      deleteTodo(todo) {
        this.todos = this.todos.filter(t => todo.id != t.id)
      },
      toggleDone(todo) {
        todo.done = !todo.done
        TodoService.update(todo)
      },
      async addTodo(){
        this.error = ''
        
        if(this.newTodoText.trim() == '') {
          this.error = 'Todo cannot be blank'
        } else {
          let newTodo = await TodoService.create({
            text: this.newTodoText,
            done: false
          })
          this.todos.push(newTodo)
          this.newTodoText = ''
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .done {
    text-decoration: line-through;
  }

  p, li, div {
    font-size: 24px;
  }

  .error {
    color: red;
  }
  .todo-list {
    text-align: left;
    max-width: 600px;
    margin: auto;
  }
</style>