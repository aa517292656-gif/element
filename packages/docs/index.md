---
layout: home

hero:
  name: "Element 组件库"
  text: "轻量级 Vue 3 组件库（练习版）"
  tagline: 统一的 UI 规范，与 Vue 3 深度集成
  actions:
    - theme: brand
      text: 快速上手
      link: /getting-started
    - theme: alt
      text: Button 按钮
      link: /components/button
    - theme: alt
      text: ButtonGroup 按钮组
      link: /components/button-group
    - theme: alt
      text: Table 表格
      link: /components/table

features:
  - title: 简单易用
    details: 提供常用基础组件（Button、ButtonGroup、Table 等），API 设计贴近 Element Plus，方便上手。
  - title: TypeScript 支持
    details: 全量使用 TypeScript 开发，类型安全，良好的编辑器提示。
  - title: 文档与示例
    details: 集成 VitePress 文档站点，提供组件示例和最佳实践。
---

## 介绍

Element 组件库是一个基于 Vue 3 的练习型组件库，目前重点实现了：

- Button 按钮
- ButtonGroup 按钮组
- Table 表格

你可以在左侧导航或通过下方链接查看每个组件的使用说明和示例。

## 快速开始

```bash
# 启动文档开发服务器
pnpm docs:dev

# 构建静态文档
pnpm docs:build

# 预览构建产物
pnpm docs:preview
```

## 组件文档

- [Button 按钮](/components/button)
- [ButtonGroup 按钮组](/components/button-group)
- [Table 表格](/components/table)

