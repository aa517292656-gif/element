# Button 按钮

Button 按钮用于触发一个操作，是最常用的基础组件之一。

## 快速预览

<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
  <ElButton>默认按钮</ElButton>
  <ElButton type="primary">主要按钮</ElButton>
  <ElButton type="success">成功按钮</ElButton>
  <ElButton type="warning">警告按钮</ElButton>
  <ElButton type="danger">危险按钮</ElButton>
</div>

## 基础用法

```vue
<template>
  <ElButton>默认按钮</ElButton>
  <ElButton type="primary">主要按钮</ElButton>
  <ElButton type="success">成功按钮</ElButton>
  <ElButton type="warning">警告按钮</ElButton>
  <ElButton type="danger">危险按钮</ElButton>
</template>
```

## 朴素按钮

```vue
<template>
  <ElButton plain>朴素按钮</ElButton>
  <ElButton type="primary" plain>主要按钮</ElButton>
  <ElButton type="success" plain>成功按钮</ElButton>
</template>
```

## 不同尺寸

```vue
<template>
  <ElButton size="large">大按钮</ElButton>
  <ElButton>默认按钮</ElButton>
  <ElButton size="small">小按钮</ElButton>
</template>
```

## 圆角与圆形

```vue
<template>
  <ElButton round>圆角按钮</ElButton>
  <ElButton type="primary" round>主要圆角按钮</ElButton>
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `default` | 按钮类型 |
| `size` | `'large' \| 'default' \| 'small'` | `default` | 按钮尺寸 |
| `plain` | `boolean` | `false` | 是否为朴素按钮 |
| `round` | `boolean` | `false` | 是否为圆角按钮 |
| `circle` | `boolean` | `false` | 是否为圆形按钮 |
| `loading` | `boolean` | `false` | 是否为加载中状态 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `nativeType` | `'button' \| 'submit' \| 'reset'` | `button` | 原生按钮类型 |
| `link` | `boolean` | `false` | 是否为链接按钮样式 |

