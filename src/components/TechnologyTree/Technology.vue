<template>
  <div class="list">
    <breadcrumb></breadcrumb>
    <div class="technology-tree">
      <div style="width: 100%;margin-top: 40px;margin-bottom: 40px">
        <div v-for="item in technology" class="technology">
          <div class="technology-level" style="">
            <div class="level">
              <span style="transform: rotate(-45deg)">{{ item.level }}</span>
            </div>
            <div style="width: 100%">
              <div class="technology-list">
                <div v-for="(tech, index) in item.data" class="technology-item" :style="getTechBack(tech.icon)"
                     :key="index">
                  <div class="technology-cost" title="消耗科技点">{{ tech.cost }}</div>
                  <div class="technology-name">{{ tech.name }}</div>
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import Breadcrumb from "~/components/Breadcrumb";
import {getTechnologyTree} from "~/api/technology/technology";

export default {
  name: 'TechnologyTree',
  components: {
    Breadcrumb
  },
  data() {
    return {
      technology: []
    }
  },
  created() {
    this.getTechnologyTree()
  },
  methods: {
    getTechnologyTree() {
      getTechnologyTree().then(res => {
        this.technology = res.data
      }).catch(() => {
      })
    },
    getTechBack(imageUrl) {
      return {
        backgroundImage: `url(/src/assets${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };
    }
  }
}
</script>

<style scoped>
.technology-tree {
  width: 90%;
  height: auto;
  display: grid;
  position: relative;
  background-color: #153147;
  margin-left: 40px;
  margin-top: 40px;
  border-radius: 10px;
}

.technology {
  width: calc(100% - 80px);
  margin: 0 40px 0 40px;
  color: white;
}

.technology-level {
  display: grid;
  grid-template-columns: 5% 90%;
}

.level {
  display: flex;
  font-size: 24px;
  margin-top: auto;
  margin-bottom: auto;
  height: 40px;
  width: 40px;
  background-color: #036171;
  border: 1px solid #34d0dd;
  transform: rotate(45deg);
  align-items: center;
  justify-content: center
}

.technology-item {
  cursor: pointer;
  width: 160px;
  height: 160px;
  border: solid white 1px;
  margin-left: 20px;
  border-radius: 5px;
  background-color: #25558F;
  background-size: 60%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px
}

.technology >>> .el-divider--horizontal {
  background-color: #036171;
  height: 2px;
}

.technology-cost {
  background-color: rgba(11, 58, 90, .5);
  border-radius: 0 4px 0 4px;
  font-size: 18px;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center
}

.technology-name {
  padding: 8px 0;
  background-color: rgba(11, 58, 90, .5);
  margin-top: auto;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  height: auto;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center
}

.technology-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
}

</style>
