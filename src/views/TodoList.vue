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
          :key="todo.text" 
          :class="{'done': todo.done}"
          @click="todo.done = true">
        {{todo.text}}
        <button @click="deleteTodo(todo)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTodoText: '',
        error: '',
        isFilteringTodos: false,
        todos: [
          {text: 'Do dishes', done: false},
          {text: 'Create Videos', done: false},
          {text: 'Answer questions', done: true}
        ]
      }
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
        let index = this.todos.findIndex(t => t == todo)
        this.todos.splice(index, 1)
      },
      addTodo(){
        this.error = ''
        
        if(this.newTodoText.trim() == '') {
          this.error = 'Todo cannot be blank'
        } else {
          this.todos.push({
            text: this.newTodoText,
            done: false
          })
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