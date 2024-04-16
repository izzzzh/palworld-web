<template>
  <transition name="el-fade-in-linear">
    <div class="list">
      <breadcrumb></breadcrumb>
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
    Breadcrumb,
    Search,
    PalMateItem
  },
}
</script>

