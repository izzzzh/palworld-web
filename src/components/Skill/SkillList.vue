<template>
  <transition name="el-fade-in-linear">
    <div class="list">
      <skill-item></skill-item>
    </div>
  </transition>
</template>

<script>
import SkillItem from "~/components/Skill/SkillItem";

export default {
  name: 'SkillList',
  components: {
    SkillItem
  }
}
</script>
