<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item>
      <h1 style="color: white;font-size: 40px;">{{ this.$route.name }}</h1>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>

export default {
  name: 'Breadcrumb',
}
</script>

<style>
.breadcrumb {
  margin-left: 40px;
  padding-top: 20px;
  height: auto;
}

</style>
