<template>
  <li>
    <span v-if="isEditing">
      <input v-model="textCopy" />
      <button @click="cancelChanges">Cancel</button>
      <button @click="saveChanges">Save</button>
    </span>
    <span v-else>
      <span @click="toggleDone(todo)"
            :class="{'done': todo.done, 'archived': todo.archived}">
        {{todo.text}}
      </span>
      <button @click="isEditing = true">Edit</button>
      <button @click="toggleArchive(todo)">{{todo.archived ? 'Unarchive' : 'Archive'}}</button>
    </span>
  </li>
</template>

<script>
  import TodoService from '@/services/TodoService'
  export default {
    data(){
      return {
        isEditing: false,
        textCopy: this.todo.text
      }
    },
    methods: {
      async saveChanges(){
        this.todo.text = this.textCopy
        await TodoService.update(this.todo)
        this.isEditing = false
      },
      cancelChanges(){
        this.isEditing = false
        this.textCopy = this.todo.text
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
      toggleArchive: {
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
  .archived {
    opacity: 0.5;
  }
</style>