<template>
  <transition name="el-fade-in-linear">
    <div class="list">
      <breadcrumb></breadcrumb>
      <skill-item></skill-item>
    </div>
  </transition>
</template>

<script>
import Breadcrumb from "~/components/Breadcrumb";
import SkillItem from "~/components/Skill/SkillItem";

export default {
  name: 'SkillList',
  components: {
    Breadcrumb,
    SkillItem
  }
}
</script>
