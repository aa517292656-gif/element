import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import element from '@element/core'
import '@element/theme/index.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 保留默认主题的增强逻辑
    DefaultTheme.enhanceApp?.({ app, router, siteData })

    // 注册 Element 组件库，这样在文档中可以直接使用 ElButton / ElButtonGroup / ElTable 等组件
    app.use(element)
  }
}

export default theme
