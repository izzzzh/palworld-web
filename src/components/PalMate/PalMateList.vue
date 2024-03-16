<template>
  <transition name="el-fade-in-linear">
    <div class="list">
      <breadcrumb></breadcrumb>
      <search ref="palMateSearch" @searchPalMate="searchPalMate"></search>
      <pal-mate-item ref="palMateItem"></pal-mate-item>
    </div>
  </transition>
</template>

<script>
import Search from "~/components/PalMate/Search";
import PalMateItem from "~/components/PalMate/PalMateItem";
import Breadcrumb from "~/components/Breadcrumb";

export default {
  name: 'PalMateList',
  components: {
    Search,
    PalMateItem,
    Breadcrumb
  },
  methods: {
    searchPalMate(params) {
      this.$store.state.palMate = []
      this.$refs.palMateItem.page = 1
      this.$refs.palMateItem.loading = true
      this.$refs.palMateItem.listPalMate(params)
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.palMate = []
    this.$store.state.parentOne = 0
    this.$store.state.parentTwo = 0
    this.$store.state.result = 0
    next()
  }
}
</script>

