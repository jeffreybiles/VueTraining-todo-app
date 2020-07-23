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
      <TodoItem v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
                :toggleDone="toggleDone"
                :deleteTodo="deleteTodo" />
    </ul>
  </div>
</template>

<script>
  import TodoService from '@/services/TodoService'
  import TodoItem from '@/components/TodoItem.vue';
  
  export default {
    components: {
      TodoItem
    },
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
        TodoService.delete(todo)
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