<template>
  <ul>
    <li
      v-for="(todo, index) in lists"
      :key="todo.id">
      <slot :todo="todo">
        {{todo.name}}
      </slot> 
    </li>
  </ul>
</template>

<script>
export default {
  name: 'list-item',

  props: {
    todos: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      lists: this.todos
    };
  }
};
</script>
