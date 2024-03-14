<template>
  <transition name="el-fade-in-linear">
    <div class="list" @scroll="handleScroll">
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
    handleScroll(event) {
      const {scrollTop, clientHeight, scrollHeight} = event.target;
      if (scrollTop + clientHeight >= scrollHeight && !this.$refs.palMateItem.noScroll) {
        this.$refs.palMateItem.page++
        let params = {
          "parent_one": this.$refs.palMateSearch.parent_one,
          "parent_two": this.$refs.palMateSearch.parent_two,
          "result": this.$refs.palMateSearch.result,
          "page": this.$refs.palMateItem.page,
        }
        this.$refs.palMateItem.loading = true
        this.$refs.palMateItem.listPalMate(params)
      }
    },
    searchPalMate(params) {
      this.$store.state.palMate = []
      this.$refs.palMateItem.page = 1
      this.$refs.palMateItem.loading = true
      this.$refs.palMateItem.listPalMate(params)
    }
  },
  beforeRouteLeave(to, form, next) {
    this.$store.state.palMate = []
    this.$refs.palMateSearch.result = 0
    this.$refs.palMateSearch.parent_one = 0
    this.$refs.palMateSearch.parent_two = 0
    next()
  }
}
</script>

