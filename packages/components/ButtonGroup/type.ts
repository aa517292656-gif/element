import type { ButtonType, ButtonSize } from '../Button/type'

export interface ButtonGroupProps {
  /** 统一设置子按钮的类型，如果子按钮自身设置了 type，则优先使用子按钮的 type */
  type?: ButtonType
  /** 统一设置子按钮的尺寸，如果子按钮自身设置了 size，则优先使用子按钮的 size */
  size?: ButtonSize
  /** 按钮组的 ARIA 标签，用于描述按钮组的用途（可选） */
  ariaLabel?: string
  /** 是否垂直排列按钮，默认为 false（水平排列） */
  vertical?: boolean
  /** 是否水平排列按钮，默认为 true（水平排列），与 vertical 互斥 */
  horizontal?: boolean
  /** 按钮组的对齐方式，可选值为 'start'、'center'、'end' */
  align?: 'start' | 'center' | 'end'
  /** 按钮之间的间距控制，可选值为 'start'、'center'、'end' */
  spacing?: 'start' | 'center' | 'end'
}

