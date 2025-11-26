<script setup lang="ts">
import { ref, inject } from 'vue';
import type { ButtonProps } from './type'
import type { ButtonType, ButtonSize } from './type'
import './style.less'
defineOptions({
  name: 'ElButton'
})

// 从 ButtonGroup 接收类型和尺寸（如果存在）
const buttonGroup = inject<{ type?: ButtonType; size?: ButtonSize } | undefined>('buttonGroup', undefined)

const props = withDefaults(defineProps<ButtonProps>(), {
  type: undefined,
  size: undefined,
  nativeType: 'button',
  loading: false,
  disabled: false,
  tag: 'button',
  plain: false,
  round: false,
  circle: false,
  link: false
})

// 优先级：子按钮的 props > ButtonGroup 的 props > 默认值
// 子按钮自身设置的 type 和 size 优先级高于 ButtonGroup 的设置
const computedType = props.type ?? buttonGroup?.type ?? 'default'
const computedSize = props.size ?? buttonGroup?.size ?? 'default'

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()
</script>

<template>
  <component 
    :is="props.tag" 
    ref="_ref" 
    :type="props.tag === 'button' ? props.nativeType : undefined" 
    class="el-button"
    :disabled="props.disabled || props.loading" 
    :class="
    {
      [`el-button--${computedType}`]: computedType,
      [`el-button--${computedSize}`]: computedSize,
      'is-loading': props.loading,
      'is-disabled': props.disabled,
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-link': props.link,
    }"
    >
    <slot></slot>
  </component>
</template>