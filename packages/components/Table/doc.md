# Table 表格组件需求文档

## 1. 组件概述

Table（表格）组件用于展示结构化数据，支持列定义、排序、筛选、分页等能力，是中后台系统中最常用的组件之一。本项目中的 Table 目标是实现一个 **轻量但易扩展** 的表格组件，优先满足基础展示、样式统一和可组合能力。

## 2. 功能需求

### 2.1 基础功能
- ✅ 支持通过数据源（`data`）和列配置（`columns`）渲染表格
- ✅ 支持表头和表体分离渲染
- ✅ 支持空数据占位展示（空状态提示文案/插槽）
- ✅ 支持行 hover 效果
- ✅ 支持基础边框/斑马纹样式切换

### 2.2 列配置
- 每一列通过 `columns` 配置项定义，包含：
  - `prop`：字段名（从 `data` 中读取）
  - `label`：列头显示文案
  - `width` / `minWidth`：列宽配置
  - `align`：列对齐方式（左/中/右）
  - `sortable`：是否支持排序
  - `fixed`：是否固定在左侧或右侧（初期可选，仅预留字段）
  - `formatter`：单元格自定义格式化函数
  - `slot`：支持通过插槽自定义单元格内容（如操作列、状态标签）

### 2.3 排序
- 支持对指定列进行排序（前端排序）
- 支持排序状态：默认 / 升序 / 降序
- 支持点击表头排序图标切换排序状态
- 排序优先在组件内部完成，预留回调（`onSortChange`）用于外部控制

### 2.4 选择功能（可选阶段）
- 支持多选：
  - 通过在表头添加选择列（checkbox）
  - 点击行前的 checkbox 选择单行
  - 支持“全选/反选”
- 支持单选（radio）模式（预留需求）

### 2.5 分页（后续扩展）
- 预留外部分页组合使用场景：
  - Table 本身不强耦合分页逻辑
  - 通过 props 接收当前页、每页数量和总数，仅参与展示
  - 分页组件可以与 Table 组合为更高阶组件

### 2.6 加载与空状态
- 支持加载状态（`loading`）：
  - 表格上方显示加载中遮罩或 loading 图标
- 支持空状态（`empty` 插槽或文案）：
  - 当 `data` 为空时展示友好的空状态提示

## 3. API 设计

### 3.1 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `data` | `Record<string, any>[]` | `[]` | 表格数据源，数组每一项表示一行数据 |
| `columns` | `TableColumn[]` | `[]` | 列配置，定义每一列的展示和行为 |
| `border` | `boolean` | `false` | 是否显示纵向边框 |
| `stripe` | `boolean` | `false` | 是否显示斑马纹效果 |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 表格尺寸（行高、字体大小） |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `emptyText` | `string` | `'暂无数据'` | 空数据时的默认提示文案 |
| `rowKey` | `string \| (row) => string` | `''` | 行唯一标识字段或函数，用于高效渲染与选择 |
| `highlightCurrentRow` | `boolean` | `false` | 是否高亮当前行（点击行时） |

### 3.2 TableColumn 类型（列配置）

```ts
interface TableColumn {
  prop?: string
  label?: string
  width?: number | string
  minWidth?: number | string
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: 'left' | 'right' | boolean
  formatter?: (row: any, column: TableColumn, value: any, index: number) => any
  slot?: string // 对应插槽名称，用于自定义单元格内容
}
```

### 3.3 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `row-click` | 点击行时触发 | `(row, index, event)` |
| `row-dblclick` | 双击行时触发 | `(row, index, event)` |
| `selection-change` | 选择项变更时触发 | `(selection: any[])` |
| `sort-change` | 排序条件变更时触发 | `({ prop, order })` |

### 3.4 Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义表格整体内容（高级用法预留） |
| `empty` | 空数据状态自定义内容 |
| `header` | 自定义表头区域（预留） |
| `【列插槽】` | 通过 `columns.slot` 指定的列插槽，用于自定义单元格内容 |

## 4. 使用场景

### 4.1 基础用法

```vue
<template>
  <ElTable :data="tableData" :columns="columns" />
</template>

<script setup lang="ts">
const tableData = [
  { date: '2024-01-01', name: 'Tom', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2024-01-02', name: 'Jerry', address: '上海市普陀区金沙江路 1519 弄' }
]

const columns = [
  { prop: 'date', label: '日期', width: 180 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</script>
```

### 4.2 斑马纹与边框

```vue
<template>
  <ElTable
    :data="tableData"
    :columns="columns"
    stripe
    border
  />
</template>
```

### 4.3 自定义列内容（插槽）

```vue
<template>
  <ElTable :data="tableData" :columns="columns">
    <template #status="{ row }">
      <ElButton type="success" size="small" plain>
        {{ row.active ? '已激活' : '未激活' }}
      </ElButton>
    </template>

    <template #actions="{ row }">
      <ElButton size="small">编辑</ElButton>
      <ElButton size="small" type="danger">删除</ElButton>
    </template>
  </ElTable>
</template>

<script setup lang="ts">
const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态', slot: 'status' },
  { prop: 'actions', label: '操作', slot: 'actions', width: 200 }
]
</script>
```

### 4.4 排序

```vue
<template>
  <ElTable
    :data="sortedData"
    :columns="columns"
    @sort-change="handleSortChange"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const rawData = ref([...])
const sortState = ref<{ prop?: string; order?: 'asc' | 'desc' }>({})

const sortedData = computed(() => {
  const { prop, order } = sortState.value
  if (!prop || !order) return rawData.value
  return [...rawData.value].sort((a, b) => {
    const va = a[prop]
    const vb = b[prop]
    if (va === vb) return 0
    const res = va > vb ? 1 : -1
    return order === 'asc' ? res : -res
  })
})

const columns = [
  { prop: 'date', label: '日期', sortable: true },
  { prop: 'name', label: '姓名' }
]

const handleSortChange = ({ prop, order }) => {
  sortState.value = { prop, order }
}
</script>
```

### 4.5 选择行

```vue
<template>
  <ElTable
    :data="tableData"
    :columns="columns"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup lang="ts">
const columns = [
  { type: 'selection', width: 60 },
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '地址' }
]

const handleSelectionChange = (selection) => {
  console.log('选中行：', selection)
}
</script>
```

## 5. 样式需求

### 5.1 视觉设计
- 表头与表体样式统一，视觉上形成一个整体
- 支持斑马纹样式（奇偶行背景色不同）
- 支持边框样式（可配置是否显示纵向边框）
- 单元格内容溢出时可通过样式控制（如 `text-overflow: ellipsis`）

### 5.2 交互反馈
- 行 hover 时高亮当前行背景
- 支持高亮当前选中行（可通过 `highlightCurrentRow` 控制）
- 排序列在排序状态下展示对应图标和高亮样式

## 6. 可访问性需求

### 6.1 语义化
- 使用 `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` 等语义化标签
- 或在使用 div 渲染时，补充合适的 `role` 和 `aria-*` 属性

### 6.2 键盘与屏幕阅读器
- 行选择/操作列应支持键盘操作（Tab 聚焦 + Enter 触发）
- 表头排序图标应有可访问名称（例如通过 `aria-label` 描述“按日期升序/降序”）

## 7. 技术实现要求

### 7.1 性能
- 使用虚拟 DOM 高效渲染中小规模数据
- 为后续虚拟滚动预留扩展空间（不在首版实现）

### 7.2 组合能力
- 与 Button、ButtonGroup 等组件良好配合（如操作列中的按钮）
- 支持在外层通过组合组件添加分页、过滤栏等

### 7.3 代码质量
- 使用 TypeScript 编写，保证类型安全
- 保持 API 命名尽量贴近 Element Plus，便于迁移和理解
- 为核心逻辑（排序、选择）编写单元测试

## 8. 开发计划

### 阶段一：基础展示
- [ ] 支持 `data` + `columns` 渲染表格
- [ ] 支持空数据状态和空插槽
- [ ] 支持基础样式（边框、斑马纹、行 hover）

### 阶段二：交互能力
- [ ] 支持列排序（前端排序）
- [ ] 支持多选列（selection）
- [ ] 支持行点击事件与当前行高亮

### 阶段三：增强能力
- [ ] 支持列插槽自定义单元格
- [ ] 支持列 formatter
- [ ] 支持固定列（fixed）

### 阶段四：优化与文档
- [ ] 性能优化与大数据量场景测试
- [ ] 完善文档与示例
- [ ] 编写单元测试，保证核心功能稳定

