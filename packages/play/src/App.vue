<script setup lang="ts">
import { ref } from 'vue'

// 基础表格数据
const basicData = [
  { date: '2024-01-01', name: 'Tom', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2024-01-02', name: 'Jerry', address: '上海市普陀区金沙江路 1519 弄' },
  { date: '2024-01-03', name: 'Alice', address: '上海市普陀区金沙江路 1520 弄' }
]

const basicColumns = [
  { prop: 'date', label: '日期', width: 180, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

// 带多选的表格
const selectionColumns = [
  { type: 'selection', width: 60 },
  ...basicColumns
]

const selection = ref<any[]>([])

const handleSelectionChange = (rows: any[]) => {
  selection.value = rows
  console.log('当前选中行：', rows)
}

// 带插槽的表格
const slotColumns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' },
  { prop: 'status', label: '状态', slot: 'status', width: 120 }
]

const slotData = [
  { name: 'Tom', address: '上海', active: true },
  { name: 'Jerry', address: '北京', active: false }
]
</script>

<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px;">
    <h1>Table 组件示例</h1>

    <!-- 基础表格 -->
    <section>
      <h2>基础用法</h2>
      <ElTable
        :data="basicData"
        :columns="basicColumns"
        stripe
        border
        highlightCurrentRow
        @sort-change="(state: any) => console.log('排序变化：', state)"
      />
    </section>

    <!-- 多选表格 -->
    <section>
      <h2>多选表格</h2>
      <ElTable
        :data="basicData"
        :columns="selectionColumns"
        border
        @selection-change="handleSelectionChange"
      />
      <div style="margin-top: 8px; font-size: 13px; color: #666;">
        已选中 {{ selection.length }} 行
      </div>
    </section>

    <!-- 自定义列内容（插槽） -->
    <section>
      <h2>自定义列（插槽）</h2>
      <ElTable :data="slotData" :columns="slotColumns" border>
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
    </section>
  </div>
</template>
