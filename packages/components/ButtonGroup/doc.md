# ButtonGroup 组件需求文档

## 1. 组件概述

ButtonGroup（按钮组）是 Element 组件库中用于组合多个按钮的容器组件。它可以将多个按钮组合在一起，形成视觉上连续的按钮组，并提供统一控制按钮类型和尺寸的能力。ButtonGroup 通常用于将相关的操作按钮组合在一起，提升界面的组织性和用户体验。

## 2. 功能需求

### 2.1 基础功能
- ✅ 支持包裹多个 Button 组件
- ✅ 支持统一控制子按钮的类型（type）
- ✅ 支持统一控制子按钮的尺寸（size）
- ✅ 支持按钮之间的边框合并，形成连续的视觉效果
- ✅ 支持子按钮的独立配置（子按钮的 props 优先级高于 ButtonGroup）

### 2.2 样式特性
- **边框合并**：按钮组内的按钮之间共享边框，形成连续的视觉效果
- **圆角处理**：第一个按钮只有左侧圆角，最后一个按钮只有右侧圆角，中间按钮无圆角
- **层级管理**：hover 和 active 状态下使用 z-index 提升按钮层级，确保交互效果正确
- **浮动布局**：使用浮动布局实现按钮的水平排列

### 2.3 交互特性
- **独立交互**：每个按钮保持独立的点击、hover、focus 等交互能力
- **视觉连续性**：按钮组内的按钮在视觉上形成连续的整体
- **状态隔离**：每个按钮的状态（disabled、loading）独立管理

## 3. API 设计

### 3.1 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| undefined` | `undefined` | 统一设置子按钮的类型，如果子按钮自身设置了 type，则优先使用子按钮的 type |
| `size` | `'large' \| 'default' \| 'small' \| undefined` | `undefined` | 统一设置子按钮的尺寸，如果子按钮自身设置了 size，则优先使用子按钮的 size |

### 3.2 Events

ButtonGroup 作为容器组件，不直接触发事件。事件由内部的 Button 组件触发。

### 3.3 Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 按钮组内容，通常包含多个 `ElButton` 组件 |

## 4. 使用场景

### 4.1 基础用法
```vue
<template>
  <ElButtonGroup>
    <ElButton>按钮 1</ElButton>
    <ElButton>按钮 2</ElButton>
    <ElButton>按钮 3</ElButton>
  </ElButtonGroup>
</template>
```

### 4.2 统一类型
```vue
<template>
  <ElButtonGroup type="primary">
    <ElButton>主要操作 1</ElButton>
    <ElButton>主要操作 2</ElButton>
    <ElButton>主要操作 3</ElButton>
  </ElButtonGroup>
</template>
```

### 4.3 统一尺寸
```vue
<template>
  <ElButtonGroup size="large">
    <ElButton>大按钮 1</ElButton>
    <ElButton>大按钮 2</ElButton>
    <ElButton>大按钮 3</ElButton>
  </ElButtonGroup>
</template>
```

### 4.4 组合使用
```vue
<template>
  <ElButtonGroup type="primary" size="default">
    <ElButton>操作 1</ElButton>
    <ElButton>操作 2</ElButton>
    <ElButton>操作 3</ElButton>
  </ElButtonGroup>
</template>
```

### 4.5 混合类型（子按钮优先级）
```vue
<template>
  <ElButtonGroup type="primary">
    <ElButton>主要操作</ElButton>
    <ElButton type="danger">危险操作</ElButton>
    <ElButton>主要操作</ElButton>
  </ElButtonGroup>
</template>
```

### 4.6 不同尺寸的按钮组
```vue
<template>
  <ElButtonGroup size="small">
    <ElButton>小按钮 1</ElButton>
    <ElButton>小按钮 2</ElButton>
    <ElButton>小按钮 3</ElButton>
  </ElButtonGroup>
  
  <ElButtonGroup size="default">
    <ElButton>默认按钮 1</ElButton>
    <ElButton>默认按钮 2</ElButton>
    <ElButton>默认按钮 3</ElButton>
  </ElButtonGroup>
  
  <ElButtonGroup size="large">
    <ElButton>大按钮 1</ElButton>
    <ElButton>大按钮 2</ElButton>
    <ElButton>大按钮 3</ElButton>
  </ElButtonGroup>
</template>
```

### 4.7 不同类型的按钮组
```vue
<template>
  <ElButtonGroup type="primary">
    <ElButton>主要</ElButton>
    <ElButton>主要</ElButton>
  </ElButtonGroup>
  
  <ElButtonGroup type="success">
    <ElButton>成功</ElButton>
    <ElButton>成功</ElButton>
  </ElButtonGroup>
  
  <ElButtonGroup type="warning">
    <ElButton>警告</ElButton>
    <ElButton>警告</ElButton>
  </ElButtonGroup>
  
  <ElButtonGroup type="danger">
    <ElButton>危险</ElButton>
    <ElButton>危险</ElButton>
  </ElButtonGroup>
</template>
```

## 5. 样式需求

### 5.1 视觉设计
- 按钮组内的按钮应形成视觉上的连续整体
- 按钮之间的边框应合并，避免重复边框
- 第一个和最后一个按钮应保持适当的圆角
- 按钮组应具有良好的对齐和间距

### 5.2 布局要求
- 使用浮动布局实现水平排列
- 清除浮动，避免影响后续元素布局
- 支持垂直对齐（vertical-align: middle）

### 5.3 交互反馈
- **Hover 状态**：鼠标悬停时，按钮应提升层级（z-index: 1），确保边框和阴影效果正确显示
- **Active 状态**：点击时，按钮应进一步提升层级（z-index: 2），确保按下效果正确显示
- **Disabled 状态**：禁用按钮应保持最低层级（z-index: 0），避免遮挡其他按钮

### 5.4 边框处理
- 第一个按钮：移除右侧圆角，右侧边框颜色调整为半透明（rgba(255, 255, 255, 0.5)）
- 最后一个按钮：移除左侧圆角，左侧边框颜色调整为半透明
- 中间按钮：移除所有圆角，左右边框颜色都调整为半透明
- 按钮之间：使用负边距（margin-right: -1px）实现边框合并

## 6. 可访问性需求

### 6.1 键盘支持
- 按钮组内的每个按钮都应支持独立的键盘操作
- 支持 `Tab` 键在按钮组内的按钮之间切换焦点
- 支持 `Enter` 和 `Space` 键触发按钮点击

### 6.2 ARIA 属性
- 按钮组容器可以使用 `role="group"` 标识按钮组
- 可以使用 `aria-label` 描述按钮组的用途（可选）

### 6.3 语义化
- 使用 `<div>` 作为容器元素
- 内部使用 Button 组件，保持按钮的语义正确

## 7. 技术实现要求

### 7.1 组件通信
- 使用 Vue 3 的 `provide/inject` 机制向子组件传递 type 和 size
- 子组件（Button）通过 `inject` 接收 ButtonGroup 提供的 props
- 子组件的 props 优先级高于 ButtonGroup 提供的 props

### 7.2 性能要求
- 组件应轻量级，不影响页面性能
- 避免不必要的重渲染
- 使用 CSS 实现样式，避免 JavaScript 计算

### 7.3 兼容性
- 支持 Vue 3.x
- 支持现代浏览器（Chrome、Firefox、Safari、Edge 最新版本）
- 支持 TypeScript

### 7.4 代码质量
- 代码应遵循项目代码规范
- 应提供完整的 TypeScript 类型定义
- 应编写单元测试，覆盖率 ≥ 80%

## 8. 开发计划

### 阶段一：基础功能（已完成）
- [x] 基础容器组件实现
- [x] provide/inject 机制实现
- [x] 基础样式实现（边框合并、圆角处理）
- [x] 浮动布局实现

### 阶段二：样式优化
- [x] 边框颜色处理（半透明边框）
- [x] 层级管理（z-index）
- [x] 清除浮动
- [ ] 响应式布局支持（可选）

### 阶段三：功能扩展
- [ ] 垂直按钮组支持（可选）
- [ ] 按钮组对齐方式（可选）
- [ ] 按钮组间距控制（可选）

### 阶段四：优化与完善
- [ ] 可访问性优化
- [ ] 性能优化
- [ ] 单元测试
- [ ] 文档完善

## 9. 参考设计

参考 Element Plus、Ant Design Vue、Vuetify 等主流组件库的 ButtonGroup 组件设计，确保组件符合用户使用习惯。

### 9.1 Element Plus 设计特点
- 使用浮动布局实现水平排列
- 第一个和最后一个按钮保持圆角
- 中间按钮无圆角，边框合并
- hover 和 active 状态下使用 z-index 提升层级

### 9.2 设计原则
- 保持视觉连续性
- 确保交互的正确性
- 支持灵活的组合方式

## 10. 注意事项

1. **子按钮优先级**：子按钮自身设置的 type 和 size 优先级高于 ButtonGroup 的设置
2. **按钮数量**：建议按钮组内的按钮数量不超过 5 个，避免视觉混乱
3. **按钮内容**：按钮组内的按钮内容应保持长度相近，确保视觉平衡
4. **禁用状态**：如果按钮组内部分按钮禁用，应确保禁用按钮的层级正确
5. **响应式**：在移动端，按钮组可能需要调整为垂直布局或换行显示
6. **语义化**：按钮组内的按钮应具有相关的功能，避免将不相关的操作组合在一起
7. **可访问性**：确保按钮组在键盘导航和屏幕阅读器中有良好的体验

## 11. 实现细节

### 11.1 Provide/Inject 机制
```typescript
// ButtonGroup.vue
provide('buttonGroup', {
  type: props.type,
  size: props.size
})

// Button.vue
const buttonGroup = inject<{ type?: ButtonType; size?: ButtonSize } | undefined>('buttonGroup', undefined)
const computedType = buttonGroup?.type ?? props.type
const computedSize = buttonGroup?.size ?? props.size
```

### 11.2 样式实现
- 使用 `float: left` 实现水平排列
- 使用 `margin-right: -1px` 实现边框合并
- 使用 `z-index` 管理交互层级
- 使用 `::after` 伪元素清除浮动

### 11.3 边框颜色处理
- 按钮组内的按钮边框使用半透明颜色（rgba(255, 255, 255, 0.5)）
- 确保不同颜色的按钮在组合时边框过渡自然

