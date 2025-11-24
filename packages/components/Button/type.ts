export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type NativeButtonType = 'button' | 'submit' | 'reset'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
  tag?: 'button' | 'a' | 'input'
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeButtonType
  loading?: boolean
  disabled?: boolean
  plain?: boolean
  round?: boolean
  circle?: boolean
  link?: boolean
}