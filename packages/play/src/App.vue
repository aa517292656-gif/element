<script setup lang="ts">
</script>

<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
    <h2>ButtonGroup 示例</h2>
    
    <!-- 垂直布局 -->
    <div>
      <h3>垂直布局</h3>
      <ElButtonGroup vertical align="center" spacing="center">
        <ElButton type="success" size="small" plain>Button 1</ElButton>
        <ElButton type="success" size="small" plain>Button 2</ElButton>
        <ElButton type="success" size="small" plain>Button 3</ElButton>
      </ElButtonGroup>
    </div>

    <!-- 水平布局（默认） -->
    <div>
      <h3>水平布局（默认）</h3>
      <ElButtonGroup type="primary" spacing="center">
        <ElButton>按钮 1</ElButton>
        <ElButton>按钮 2</ElButton>
        <ElButton>按钮 3</ElButton>
      </ElButtonGroup>
    </div>

    <!-- 不同尺寸 -->
    <div>
      <h3>不同尺寸</h3>
      <ElButtonGroup size="large" spacing="center">
        <ElButton>大按钮 1</ElButton>
        <ElButton>大按钮 2</ElButton>
      </ElButtonGroup>
      <br><br>
      <ElButtonGroup size="small" spacing="center">
        <ElButton>小按钮 1</ElButton>
        <ElButton>小按钮 2</ElButton>
      </ElButtonGroup>
    </div>

    <!-- 对齐方式 -->
    <div>
      <h3>对齐方式</h3>
      <ElButtonGroup align="start" spacing="center">
        <ElButton>左对齐</ElButton>
        <ElButton>左对齐</ElButton>
      </ElButtonGroup>
      <br><br>
      <ElButtonGroup align="center" spacing="center">
        <ElButton>居中</ElButton>
        <ElButton>居中</ElButton>
      </ElButtonGroup>
      <br><br>
      <ElButtonGroup align="end" spacing="center">
        <ElButton>右对齐</ElButton>
        <ElButton>右对齐</ElButton>
      </ElButtonGroup>
    </div>

    <!-- 带间距 -->
    <div>
      <h3>带间距</h3>
      <ElButtonGroup spacing="center">
        <ElButton type="primary">有间距</ElButton>
        <ElButton type="primary">有间距</ElButton>
        <ElButton type="primary">有间距</ElButton>
      </ElButtonGroup>
    </div>
  </div>
</template>
