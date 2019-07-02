<template>
  <div>
    <p>App Component</p>
    <p>hello world</p>
    <hr>
    <Foo></Foo>
  </div>
</template>

<script>
import Foo from './components/Foo.vue'

export default {
  name: 'App',
  components: {
    Foo
  }
}
</script>

<style lang="less">
div {
  p {
    color: red;
  }
}
</style>
