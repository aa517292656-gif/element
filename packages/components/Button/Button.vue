<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './type'
import './style.less'
defineOptions({
  name: 'ElButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  nativeType: 'button',
  loading: false,
  disabled: false,
  tag: 'button',
  plain: false,
  round: false,
  circle: false,
  link: false
})

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()
</script>

<template>
  <component 
    :is="props.tag" 
    ref="_ref" 
    :type="tag === 'button' ? nativeType : 'button'" 
    class="el-button"
    :disabled="disabled || loading" 
    :class="
    {
      [`el-button--${type}`]: type,
      [`el-button--${size}`]: size,
      'is-loading': loading,
      'is-disabled': disabled,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-link': link,
    }"
    >
    <slot></slot>
  </component>
</template>