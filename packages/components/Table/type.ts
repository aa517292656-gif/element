export type TableSize = 'large' | 'default' | 'small'
export type TableAlign = 'left' | 'center' | 'right'
export type TableFixed = 'left' | 'right' | boolean
export type SortOrder = 'asc' | 'desc' | undefined

/** 列配置类型 */
export interface TableColumn {
  /** 对应列内容的字段名，从 data 中读取 */
  prop?: string
  /** 列头显示的文案 */
  label?: string
  /** 列宽 */
  width?: number | string
  /** 最小列宽 */
  minWidth?: number | string
  /** 列内容对齐方式 */
  align?: TableAlign
  /** 列头对齐方式（默认同 align） */
  headerAlign?: TableAlign
  /** 是否支持排序 */
  sortable?: boolean
  /** 是否固定列（左/右） */
  fixed?: TableFixed
  /** 单元格格式化函数 */
  formatter?: (row: any, column: TableColumn, value: any, index: number) => any
  /** 对应插槽名称，用于自定义单元格内容 */
  slot?: string
  /** 列类型：selection / index / expand ...（为以后扩展预留） */
  type?: 'selection' | 'index' | 'expand' | string
}

/** 排序状态 */
export interface TableSortState {
  prop?: string
  order?: SortOrder
}

/** Table 组件 Props */
export interface TableProps {
  /** 表格数据源 */
  data?: Record<string, any>[]
  /** 列配置 */
  columns?: TableColumn[]
  /** 是否显示纵向边框 */
  border?: boolean
  /** 是否显示斑马纹效果 */
  stripe?: boolean
  /** 表格尺寸（行高、字体大小） */
  size?: TableSize
  /** 是否显示加载状态 */
  loading?: boolean
  /** 空数据时的默认提示文案 */
  emptyText?: string
  /** 行唯一标识字段或函数 */
  rowKey?: string | ((row: any) => string)
  /** 是否高亮当前行 */
  highlightCurrentRow?: boolean
}

/** 行点击事件回调类型 */
export type RowClickHandler = (row: any, index: number, event: MouseEvent) => void

/** 选择变化事件回调类型 */
export type SelectionChangeHandler = (selection: any[]) => void

/** 排序变化事件回调类型 */
export type SortChangeHandler = (state: TableSortState) => void
