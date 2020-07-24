<template>
  <div class="todo-list">
    <form @submit.prevent="addTodo">
      <input v-model="newTodoText" />
      <input type="submit" value="Create Todo" />
    </form>
    <div class="error">{{error}}</div>
    <p>{{todosRemaining}} incomplete todos remaining</p>
    <button @click="hideComplete = !hideComplete">
      {{hideComplete ? 'Stop' : 'Start'}} hiding completed todos
    </button>
    <button @click="hideArchived = !hideArchived">
      {{hideArchived ? 'Stop' : 'Start'}} hiding archived todos
    </button>
    <ul>
      <TodoItem v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
                :toggleDone="toggleDone"
                :toggleArchive="toggleArchive" />
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
        hideComplete: false,
        hideArchived: false,
        todos: []
      }
    },
    async created(){
      let response = await TodoService.getAll();
      this.todos = response.data
    },
    computed: {
      todosRemaining(){
        return this.incompleteTodos.length
      },
      incompleteTodos(){
        return this.todos.filter(t => !t.done)
      },
      filteredTodos(){
        let todos = this.todos;

        if(this.hideComplete) {
          todos = todos.filter(t => !t.done)
        }

        if(this.hideArchived) {
          todos = todos.filter(t => !t.archived)
        }

        return todos
      }
    },
    methods: {
      toggleArchive(todo) {
        todo.archived = !todo.archived
        TodoService.update(todo)
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