# Table 表格

Table 用于展示结构化数据，支持列配置、排序、多选以及自定义单元格。

## 快速预览

<div style="margin-bottom: 16px;">
  <ElTable
    :data="[
      { date: '2024-01-01', name: 'Tom', address: '上海' },
      { date: '2024-01-02', name: 'Jerry', address: '北京' }
    ]"
    :columns="[
      { prop: 'date', label: '日期', width: 160 },
      { prop: 'name', label: '姓名', width: 100 },
      { prop: 'address', label: '地址' }
    ]"
    stripe
    border
  />
</div>

## 基础用法

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

## 斑马纹与边框

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

## 多选表格

```vue
<template>
  <ElTable
    :data="tableData"
    :columns="columnsWithSelection"
    border
    @selection-change="handleSelectionChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = [
  { name: 'Tom', address: '上海' },
  { name: 'Jerry', address: '北京' }
]

const columnsWithSelection = [
  { type: 'selection', width: 60 },
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '地址' }
]

const selection = ref<any[]>([])

const handleSelectionChange = (rows: any[]) => {
  selection.value = rows
}
</script>
```

## 自定义列（插槽）

```vue
<template>
  <ElTable :data="tableData" :columns="columns">
    <template #status="{ row }">
      <ElButton
        size="small"
        :type="row.active ? 'success' : 'warning'"
        plain
      >
        {{ row.active ? '已激活' : '未激活' }}
      </ElButton>
    </template>
  </ElTable>
</template>

<script setup lang="ts">
const tableData = [
  { name: 'Tom', status: true },
  { name: 'Jerry', status: false }
]

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态', slot: 'status', width: 120 }
]
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `data` | `Record<string, any>[]` | `[]` | 表格数据源 |
| `columns` | `TableColumn[]` | `[]` | 列配置 |
| `border` | `boolean` | `false` | 是否显示纵向边框 |
| `stripe` | `boolean` | `false` | 是否显示斑马纹效果 |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 表格尺寸 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `emptyText` | `string` | `'暂无数据'` | 空数据时的默认提示文案 |
| `rowKey` | `string \| (row) => string` | `''` | 行唯一标识字段或函数 |
| `highlightCurrentRow` | `boolean` | `false` | 是否高亮当前行 |

## TableColumn

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
  slot?: string
  type?: 'selection' | 'index' | 'expand' | string
}
```

