# ButtonGroup 按钮组

ButtonGroup 用于将一组相关的按钮组合在一起，形成一个整体操作区域。

## 快速预览

<div style="display: flex; flex-direction: column; gap: 12px;">
  <ElButtonGroup spacing="center">
    <ElButton>按钮 1</ElButton>
    <ElButton>按钮 2</ElButton>
    <ElButton>按钮 3</ElButton>
  </ElButtonGroup>

  <ElButtonGroup type="primary" size="small" spacing="center">
    <ElButton>主要 1</ElButton>
    <ElButton>主要 2</ElButton>
    <ElButton>主要 3</ElButton>
  </ElButtonGroup>
</div>

## 基础用法

```vue
<template>
  <ElButtonGroup>
    <ElButton>按钮 1</ElButton>
    <ElButton>按钮 2</ElButton>
    <ElButton>按钮 3</ElButton>
  </ElButtonGroup>
</template>
```

## 统一类型与尺寸

```vue
<template>
  <ElButtonGroup type="primary" size="small">
    <ElButton>操作 1</ElButton>
    <ElButton>操作 2</ElButton>
    <ElButton>操作 3</ElButton>
  </ElButtonGroup>
</template>
```

## 垂直布局

```vue
<template>
  <ElButtonGroup vertical align="center" spacing="center">
    <ElButton type="success" size="small" plain>Button 1</ElButton>
    <ElButton type="success" size="small" plain>Button 2</ElButton>
    <ElButton type="success" size="small" plain>Button 3</ElButton>
  </ElButtonGroup>
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| undefined` | `undefined` | 统一设置子按钮的类型 |
| `size` | `'large' \| 'default' \| 'small' \| undefined` | `undefined` | 统一设置子按钮的尺寸 |
| `ariaLabel` | `string` | `-` | ARIA 标签，用于辅助说明按钮组用途 |
| `vertical` | `boolean` | `false` | 是否垂直排列按钮 |
| `horizontal` | `boolean` | `true` | 是否水平排列按钮（与 `vertical` 互斥） |
| `align` | `'start' \| 'center' \| 'end'` | `undefined` | 按钮组的对齐方式 |
| `spacing` | `'start' \| 'center' \| 'end'` | `undefined` | 按钮之间的间距策略 |

