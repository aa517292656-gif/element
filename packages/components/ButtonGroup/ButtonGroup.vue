<script setup lang="ts">
import { provide, computed } from 'vue'
import type { ButtonGroupProps } from './type'
import './style.less'

defineOptions({
  name: 'ElButtonGroup'
})

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  type: undefined,
  size: undefined,
  ariaLabel: undefined,
  vertical: false,
  horizontal: true,
  align: undefined,
  spacing: undefined
})

// 确定布局方向：vertical 优先级高于 horizontal
const isVertical = computed(() => {
  if (props.vertical) return true
  if (props.horizontal === false) return true
  return false
})

// 向子组件提供按钮组的类型和尺寸
// 子组件（Button）通过 inject 接收，优先级低于子组件自身的 props
provide('buttonGroup', {
  type: props.type,
  size: props.size
})

// 计算 ARIA 属性
const ariaAttributes = computed(() => {
  const attrs: Record<string, string> = {
    role: 'group'
  }
  if (props.ariaLabel) {
    attrs['aria-label'] = props.ariaLabel
  }
  return attrs
})

// 计算类名
const classNames = computed(() => {
  return {
    'el-button-group': true,
    'is-vertical': isVertical.value,
    'is-horizontal': !isVertical.value,
    [`is-align-${props.align}`]: !!props.align,
    [`is-spacing-${props.spacing}`]: !!props.spacing
  }
})
</script>

<template>
  <div 
    :class="classNames"
    v-bind="ariaAttributes"
  >
    <slot></slot>
  </div>
</template>

