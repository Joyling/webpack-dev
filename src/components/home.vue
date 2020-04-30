<template>
  <div>
    home.vue
    <p v-for="l in list" :key="l.key" @click="handleClick">{{l.value}}</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'home',
      list: [
        {
          key: '1',
          value: 'No.1'
        },
        {
          key: '2',
          value: 'No.2'
        },
        {
          key: '3',
          value: 'No.3'
        }
      ]
    }
  },
  methods: {
    handleClick() {
      debugger
      console.log('click')
    }
  }
}
</script>