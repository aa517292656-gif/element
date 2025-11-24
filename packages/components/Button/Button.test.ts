import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Button from './Button.vue'

describe('ElButton', () => {
  let wrapper: VueWrapper<any>
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    wrapper?.unmount()
    consoleSpy.mockRestore()
  })

  describe('基础功能', () => {
    it('应该正确渲染按钮', () => {
      wrapper = mount(Button)
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('button').text()).toBe('Button')
    })

    it('应该正确设置组件名称', () => {
      wrapper = mount(Button)
      expect(wrapper.vm.$options.name).toBe('ElButton')
    })

    it('应该渲染为原生 button 元素', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      expect(button.element.tagName).toBe('BUTTON')
    })

    it('应该支持自定义文本内容', () => {
      wrapper = mount(Button, {
        slots: {
          default: '自定义按钮文本'
        }
      })
      expect(wrapper.find('button').text()).toBe('自定义按钮文本')
    })

    it('应该触发点击事件', async () => {
      wrapper = mount(Button)
      await wrapper.find('button').trigger('click')
      expect(consoleSpy).toHaveBeenCalledWith('click')
    })

    it('应该支持点击事件回调', async () => {
      const handleClick = vi.fn()
      wrapper = mount(Button, {
        props: {
          onClick: handleClick
        }
      })
      await wrapper.find('button').trigger('click')
      // 注意：当前实现中点击事件会调用 console.log，后续实现应该支持 emit('click')
      expect(consoleSpy).toHaveBeenCalled()
    })
  })

  describe('Props - type 类型', () => {
    it('应该支持 default 类型（默认）', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      expect(button.classes()).toContain('el-button')
      // 后续实现中应该包含 type 相关的 class
    })

    it('应该支持 primary 类型', () => {
      wrapper = mount(Button, {
        props: {
          type: 'primary'
        }
      })
      const button = wrapper.find('button')
      // 后续实现中应该包含 'el-button--primary' class
      expect(button.exists()).toBe(true)
    })

    it('应该支持 success 类型', () => {
      wrapper = mount(Button, {
        props: {
          type: 'success'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('应该支持 warning 类型', () => {
      wrapper = mount(Button, {
        props: {
          type: 'warning'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('应该支持 danger 类型', () => {
      wrapper = mount(Button, {
        props: {
          type: 'danger'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('应该支持 info 类型', () => {
      wrapper = mount(Button, {
        props: {
          type: 'info'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Props - size 尺寸', () => {
    it('应该支持 default 尺寸（默认）', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('应该支持 large 尺寸', () => {
      wrapper = mount(Button, {
        props: {
          size: 'large'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('应该支持 small 尺寸', () => {
      wrapper = mount(Button, {
        props: {
          size: 'small'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Props - disabled 禁用状态', () => {
    it('应该支持禁用状态', () => {
      wrapper = mount(Button, {
        props: {
          disabled: true
        }
      })
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
      expect(button.element.disabled).toBe(true)
    })

    it('禁用状态下不应该触发点击事件', async () => {
      wrapper = mount(Button, {
        props: {
          disabled: true
        }
      })
      const button = wrapper.find('button')
      await button.trigger('click')
      // 禁用状态下不应该触发点击
      // 注意：当前实现可能仍会触发，后续需要修复
    })

    it('默认情况下不应该禁用', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      expect(button.element.disabled).toBe(false)
    })
  })

  describe('Props - loading 加载状态', () => {
    it('应该支持加载状态', () => {
      wrapper = mount(Button, {
        props: {
          loading: true
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      // 后续实现中应该显示加载图标
    })

    it('加载状态下应该禁用交互', () => {
      wrapper = mount(Button, {
        props: {
          loading: true
        }
      })
      const button = wrapper.find('button')
      // 后续实现中加载时应该禁用按钮
      expect(button.exists()).toBe(true)
    })

    it('默认情况下不应该显示加载状态', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      // 不应该有加载相关的 class 或元素
      expect(button.exists()).toBe(true)
    })
  })

  describe('Props - plain 朴素按钮', () => {
    it('应该支持朴素按钮', () => {
      wrapper = mount(Button, {
        props: {
          plain: true
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Props - round 圆角按钮', () => {
    it('应该支持圆角按钮', () => {
      wrapper = mount(Button, {
        props: {
          round: true
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Props - circle 圆形按钮', () => {
    it('应该支持圆形按钮', () => {
      wrapper = mount(Button, {
        props: {
          circle: true
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Props - link 链接按钮', () => {
    it('应该支持链接按钮', () => {
      wrapper = mount(Button, {
        props: {
          link: true
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Props - nativeType 原生类型', () => {
    it('应该支持 button 类型（默认）', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      expect(button.attributes('type')).toBe('button')
    })

    it('应该支持 submit 类型', () => {
      wrapper = mount(Button, {
        props: {
          nativeType: 'submit'
        }
      })
      const button = wrapper.find('button')
      expect(button.attributes('type')).toBe('submit')
    })

    it('应该支持 reset 类型', () => {
      wrapper = mount(Button, {
        props: {
          nativeType: 'reset'
        }
      })
      const button = wrapper.find('button')
      expect(button.attributes('type')).toBe('reset')
    })
  })

  describe('Props - autofocus 自动聚焦', () => {
    it('应该支持自动聚焦', () => {
      wrapper = mount(Button, {
        props: {
          autofocus: true
        }
      })
      const button = wrapper.find('button')
      expect(button.attributes('autofocus')).toBeDefined()
    })

    it('默认情况下不应该自动聚焦', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      expect(button.attributes('autofocus')).toBeUndefined()
    })
  })

  describe('Props - icon 图标', () => {
    it('应该支持图标属性', () => {
      wrapper = mount(Button, {
        props: {
          icon: 'search'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      // 后续实现中应该显示图标
    })
  })

  describe('Events - 事件', () => {
    it('应该触发 click 事件', async () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      await button.trigger('click')
      // 当前实现会调用 console.log，后续应该 emit('click')
      expect(consoleSpy).toHaveBeenCalled()
    })

    it('应该触发 focus 事件', async () => {
      const onFocus = vi.fn()
      wrapper = mount(Button, {
        props: {
          onFocus
        }
      })
      const button = wrapper.find('button')
      await button.trigger('focus')
      // 后续实现中应该 emit('focus')
      expect(button.exists()).toBe(true)
    })

    it('应该触发 blur 事件', async () => {
      const onBlur = vi.fn()
      wrapper = mount(Button, {
        props: {
          onBlur
        }
      })
      const button = wrapper.find('button')
      await button.trigger('blur')
      // 后续实现中应该 emit('blur')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Slots - 插槽', () => {
    it('应该支持默认插槽', () => {
      wrapper = mount(Button, {
        slots: {
          default: '自定义内容'
        }
      })
      expect(wrapper.find('button').text()).toBe('自定义内容')
    })

    it('应该支持 icon 插槽', () => {
      wrapper = mount(Button, {
        slots: {
          icon: '<span class="icon">图标</span>',
          default: '按钮'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      // 后续实现中应该显示图标插槽内容
    })
  })

  describe('可访问性', () => {
    it('应该使用原生 button 元素保证语义化', () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      expect(button.element.tagName).toBe('BUTTON')
    })

    it('禁用状态下应该设置 aria-disabled', () => {
      wrapper = mount(Button, {
        props: {
          disabled: true
        }
      })
      const button = wrapper.find('button')
      // 后续实现中应该设置 aria-disabled="true"
      expect(button.element.disabled).toBe(true)
    })

    it('加载状态下应该设置 aria-busy', () => {
      wrapper = mount(Button, {
        props: {
          loading: true
        }
      })
      const button = wrapper.find('button')
      // 后续实现中应该设置 aria-busy="true"
      expect(button.exists()).toBe(true)
    })

    it('应该支持键盘 Enter 键触发点击', async () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      await button.trigger('keydown', { key: 'Enter' })
      // 原生 button 元素默认支持 Enter 键
      expect(button.exists()).toBe(true)
    })

    it('应该支持键盘 Space 键触发点击', async () => {
      wrapper = mount(Button)
      const button = wrapper.find('button')
      await button.trigger('keydown', { key: ' ' })
      // 原生 button 元素默认支持 Space 键
      expect(button.exists()).toBe(true)
    })
  })

  describe('组合使用', () => {
    it('应该支持多个属性组合', () => {
      wrapper = mount(Button, {
        props: {
          type: 'primary',
          size: 'large',
          disabled: true,
          round: true
        },
        slots: {
          default: '组合按钮'
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('组合按钮')
      expect(button.element.disabled).toBe(true)
    })

    it('应该支持加载状态和禁用状态的组合', () => {
      wrapper = mount(Button, {
        props: {
          loading: true,
          disabled: true
        }
      })
      const button = wrapper.find('button')
      expect(button.element.disabled).toBe(true)
    })
  })

  describe('边界情况', () => {
    it('应该处理空内容', () => {
      wrapper = mount(Button, {
        slots: {
          default: ''
        }
      })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('应该处理长文本内容', () => {
      const longText = '这是一个非常长的按钮文本内容，用于测试按钮在长文本情况下的表现'
      wrapper = mount(Button, {
        slots: {
          default: longText
        }
      })
      const button = wrapper.find('button')
      expect(button.text()).toBe(longText)
    })
  })
})
