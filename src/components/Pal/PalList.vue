<template>
  <div class="list animate__fadeInRight">
    <breadcrumb></breadcrumb>
    <search></search>
    <pal-item></pal-item>
  </div>
</template>

<script>
import Search from "./Search";
import PalItem from "./PalItem";
import Breadcrumb from "~/components/Breadcrumb";

export default {
  name: 'PalList',
  components: {
    Search,
    PalItem,
    Breadcrumb
  },
  beforeRouteLeave(to, form, next) {
    this.$store.state.palSearchName = ""
    this.$store.state.attributeId = 0
    next()
  }
}
</script>
