<template>
  <li>
    <span v-if="isEditing">
      <input v-model="todo.text" />
      <button>Cancel</button>
      <button>Save</button>
    </span>
    <span v-else>
      <span @click="toggleDone(todo)"
            :class="{'done': todo.done}">
        {{todo.text}}
      </span>
      <button @click="isEditing = true">Edit</button>
    </span>
    <button @click="deleteTodo(todo)">Delete</button>
  </li>
</template>

<script>
  export default {
    data(){
      return {
        isEditing: false
      }
    },
    props: {
      todo: {
        type: Object,
        required: true
      },
      toggleDone: {
        type: Function,
        required: true
      },
      deleteTodo: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .done {
    text-decoration: line-through;
  }
</style>