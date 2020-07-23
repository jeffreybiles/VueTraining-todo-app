<template>
  <li>
    <span @click="toggleDone(todo)"
          :class="{'done': todo.done}">
      {{todo.text}}
    </span>
    <button @click="deleteTodo(todo)">Delete</button>
  </li>
</template>

<script>
  export default {
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