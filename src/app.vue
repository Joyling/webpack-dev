<template>
  <div id="app">
    {{ message }}
   <p v-if="seen">现在你看到我了</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'dd',
      seen: true
    }
  }
}
</script>