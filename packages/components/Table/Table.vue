<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableProps, TableColumn, TableSortState } from './type'
import './style.less'

defineOptions({
  name: 'ElTable'
})

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  columns: () => [],
  border: false,
  stripe: false,
  size: 'default',
  loading: false,
  emptyText: '暂无数据',
  highlightCurrentRow: false
})

const emit = defineEmits<{
  (e: 'row-click', row: any, index: number, event: MouseEvent): void
  (e: 'row-dblclick', row: any, index: number, event: MouseEvent): void
  (e: 'selection-change', selection: any[]): void
  (e: 'sort-change', state: TableSortState): void
}>()

const slots = defineSlots<Record<string, (scope: any) => any>>()

// 选择状态
const selection = ref<any[]>([])

// 排序状态
const sortState = ref<TableSortState>({})

// 当前高亮行 key（用于 highlightCurrentRow）
const currentRowKey = ref<string | null>(null)

// 处理行唯一 key
const getRowKey = (row: any, index: number) => {
  if (!props.rowKey) return index.toString()
  if (typeof props.rowKey === 'function') return props.rowKey(row)
  return row[props.rowKey] ?? index.toString()
}

// 处理排序后的数据
const sortedData = computed(() => {
  const { prop, order } = sortState.value
  if (!prop || !order) return props.data
  return [...props.data].sort((a, b) => {
    const va = (a as any)[prop]
    const vb = (b as any)[prop]
    if (va === vb) return 0
    const res = va > vb ? 1 : -1
    return order === 'asc' ? res : -res
  })
})

// 计算是否存在选择列
const hasSelectionColumn = computed(() => props.columns?.some(col => col.type === 'selection'))

// 实际渲染的列（过滤掉 selection 列，selection 列由组件内部控制）
const displayColumns = computed<TableColumn[]>(() => {
  return (props.columns ?? []).filter(col => col.type !== 'selection')
})

// 表头点击排序
const handleSortClick = (column: TableColumn) => {
  if (!column.sortable || !column.prop) return

  const { prop, order } = sortState.value
  let nextOrder: TableSortState['order']

  if (prop !== column.prop) {
    nextOrder = 'asc'
  } else {
    if (order === 'asc') nextOrder = 'desc'
    else if (order === 'desc') nextOrder = undefined
    else nextOrder = 'asc'
  }

  sortState.value = { prop: column.prop, order: nextOrder }
  emit('sort-change', sortState.value)
}

// 选择相关
const isRowSelected = (row: any) => {
  const index = props.data.indexOf(row)
  const key = getRowKey(row, index)
  return selection.value.some(item => {
    const itemIndex = props.data.indexOf(item)
    return getRowKey(item, itemIndex) === key
  })
}

const toggleRowSelection = (row: any, checked: boolean) => {
  const index = props.data.indexOf(row)
  const key = getRowKey(row, index)
  const list = selection.value.filter(item => {
    const itemIndex = props.data.indexOf(item)
    return getRowKey(item, itemIndex) !== key
  })
  if (checked) list.push(row)
  selection.value = list
  emit('selection-change', selection.value)
}

const toggleAllSelection = (checked: boolean) => {
  if (!checked) {
    selection.value = []
  } else {
    selection.value = [...sortedData.value]
  }
  emit('selection-change', selection.value)
}

const isAllSelected = computed(() => {
  if (!sortedData.value.length) return false
  return sortedData.value.every(row => isRowSelected(row))
})

// 高亮当前行判断
const isCurrentRow = (row: any) => {
  if (!props.highlightCurrentRow || !currentRowKey.value) return false
  const index = props.data.indexOf(row)
  return currentRowKey.value === getRowKey(row, index)
}

// 行事件
const handleRowClick = (row: any, index: number, event: MouseEvent) => {
  if (props.highlightCurrentRow) {
    const key = getRowKey(row, props.data.indexOf(row))
    currentRowKey.value = key
  }
  emit('row-click', row, index, event)
}

const handleRowDblClick = (row: any, index: number, event: MouseEvent) => {
  emit('row-dblclick', row, index, event)
}

const getCellContent = (row: any, column: TableColumn, index: number) => {
  if (column.formatter && column.prop) {
    return column.formatter(row, column, (row as any)[column.prop], index)
  }
  if (column.prop) return (row as any)[column.prop]
  return ''
}

const tableClasses = computed(() => {
  return [
    'el-table',
    `el-table--${props.size}`,
    {
      'is-border': props.border,
      'is-stripe': props.stripe
    }
  ]
})
</script>

<template>
  <div :class="tableClasses">
    <div v-if="loading" class="el-table__loading">Loading...</div>

    <table class="el-table__inner">
      <thead>
        <tr>
          <th v-if="hasSelectionColumn" class="el-table__cell el-table__cell--selection">
            <input
              type="checkbox"
              :checked="isAllSelected"
              @change="toggleAllSelection(($event.target as HTMLInputElement).checked)"
            />
          </th>
          <th
            v-for="column in displayColumns"
            :key="column.prop ?? column.label ?? ''"
            class="el-table__cell el-table__cell--header"
            :style="{ textAlign: column.headerAlign || column.align || 'left', width: column.width as any }"
            @click="handleSortClick(column)"
          >
            <span>{{ column.label }}</span>
            <span v-if="column.sortable" class="el-table__sort-icons">
              <span :class="['sort-icon', { 'is-active': sortState.prop === column.prop && sortState.order === 'asc' }]">▲</span>
              <span :class="['sort-icon', { 'is-active': sortState.prop === column.prop && sortState.order === 'desc' }]">▼</span>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!sortedData.length">
          <td
            class="el-table__cell el-table__empty"
            :colspan="displayColumns.length + (hasSelectionColumn ? 1 : 0)"
          >
            <slot name="empty">
              {{ emptyText }}
            </slot>
          </td>
        </tr>

        <tr
          v-for="(row, rowIndex) in sortedData"
          :key="getRowKey(row, rowIndex)"
          class="el-table__row"
          :class="{ 'is-current': isCurrentRow(row) }"
          @click="handleRowClick(row, rowIndex, $event)"
          @dblclick="handleRowDblClick(row, rowIndex, $event)"
        >
          <td v-if="hasSelectionColumn" class="el-table__cell el-table__cell--selection">
            <input
              type="checkbox"
              :checked="isRowSelected(row)"
              @change="toggleRowSelection(row, ($event.target as HTMLInputElement).checked)"
            />
          </td>

          <td
            v-for="column in displayColumns"
            :key="column.prop ?? column.label ?? ''"
            class="el-table__cell"
            :style="{ textAlign: column.align || 'left', width: column.width as any }"
          >
            <template v-if="column.slot && slots[column.slot]">
              <slot
                :name="column.slot"
                :row="row"
                :column="column"
                :$index="rowIndex"
              />
            </template>
            <template v-else>
              {{ getCellContent(row, column, rowIndex) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
