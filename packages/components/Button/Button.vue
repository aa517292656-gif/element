<script setup lang="ts">
defineOptions({
  name: 'ElButton'
})

const handleClick = () => {
  console.log('click')
}
</script>

<template>
  <button @click="handleClick">Button</button>
</template>