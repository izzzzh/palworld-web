<template>
  <transition name="el-fade-in-linear">
    <div class="list">
      <breadcrumb></breadcrumb>
      <search></search>
      <goods-item></goods-item>
    </div>
  </transition>
</template>


<script>
import Search from "./Search";
import GoodsItem from "./GoodsItem";
import Breadcrumb from "~/components/Breadcrumb";

export default {
  name: 'GoodsList',
  components: {
    Breadcrumb,
    Search,
    GoodsItem
  },
  beforeRouteLeave(to, form, next) {
    this.$store.state.goodsTypes = 0
    this.$store.state.goodsQuality = 0
    this.$store.state.goodsName = ""
    next()
  }
}
</script>
