<template>
  <div class="list" style="  background-color: #1f2b3e">
    <div class="pal-info">
      <div style="padding: 10px">
        <el-image v-if="pal.icon !== undefined" :src="pal.icon" class="pal-icon" lazy></el-image>
        <div style="margin-top: 40px">
          <div class="pal-title"><span>帕鲁简介</span></div>
          <div class="info-box">
            <div class="pal-passive"><span>{{ pal.description }}</span></div>
          </div>
        </div>
        <div style="margin-top: 40px">
          <div class="pal-title"><span>伙伴技能</span></div>
          <div class="info-box">
            <div class="pal-passive">
              <span>⬦{{ pal.passive_skill }}</span>
              <hr>
              <span>{{ pal.passive_skill_desc }}</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 40px">
          <div class="pal-title"><span>主动技能</span></div>
          <div class="pal-skill" v-for="item in pal.active_skills">
            <el-tooltip effect="dark" placement="right">
              <div slot="content" class="skill-desc">
                {{ item.desc }}
                <hr>
                CT：{{ item.ct }}
                威力：{{ item.power }}
              </div>
              <span style="margin: 10px auto 10px 10px;">⬦{{ item.name }}</span>
            </el-tooltip>
            <div class="skill-attribute" :style="{backgroundColor:bgColor(item.attribute_id)}">
              <el-image style="width: 30px;height: 30px;margin-left: 30%;"
                        :title="item.name"
                        :src="getAttributeImageUrl(item.attribute_id)">
              </el-image>
              <div style="align-items: center;margin-right: 20px;">
                <span>{{ item.power }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="padding: 10px">
        <div class="pal-value">
          <div class="pal-info-name">
            <span style="align-items: center">{{ pal.name }}</span>
            <div class="pal-info-attribute">
              <el-image v-for="id in pal.attribute_ids" :key="id" style="width: 40px"
                        :src="getAttributeImageUrl(id)">
              </el-image>
            </div>
          </div>
          <div class="pal-info-item"><span>编号：{{ pal.number }}</span></div>
          <div class="pal-info-item"><span>生命值：{{ pal.hp }}</span></div>
          <div class="pal-info-item"><span>攻击：{{ pal.energy }}</span></div>
          <div class="pal-info-item"><span>防御：{{ pal.defensively }}</span></div>
          <div class="pal-info-item">
            <span>进食量：</span>
            <div>
              <div v-for="item in pal.eat" :key="item" class="eat">
                <el-image class="eat-icon" style="width: 20px;align-items: center;display: flex;"
                          src="/src/assets/icon/food.png">
                </el-image>
              </div>
            </div>
          </div>
        </div>
        <div class="quality" style="margin-top: 40px;margin-left: 20px">
          <div class="pal-title">
            <span>工作适应性</span>
          </div>
          <div class="quality-item">
            <div v-for="item in pal.abilities">
              <el-image class="quality-image" :title="item.name" :key="item.id"
                        :src="getAbilityImageUrl(item.icon)"></el-image>
              <span class="quality-level">Lv{{ item.level }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Comment></Comment>
      </div>
      <div style="width:100%;height: 100px"></div>
    </div>
  </div>
</template>

<script>
import {getPal} from "~/api/pals/pals";
import Comment from "~/components/Comment/Comment";

export default {
  name: 'PalInfo',
  components: {Comment},
  data() {
    return {
      pal: {},
    }
  },
  computed: {
    getAttributeImageUrl: function () {
      return function (id) {
        return '/src/assets/icon/' + id + '.png'
      }
    },
    getAbilityImageUrl: function () {
      return function (id) {
        return '/src/assets/icon/work_' + id + '.png'
      }
    },
    bgColor: function () {
      return function (attribute_id) {
        return this.$store.state.attributeColor[attribute_id]
      }
    }
  },
  created() {
    this.getPal(this.$route.params.id)
  },
  methods: {
    getPal(id) {
      getPal(id).then(res => {
        this.pal = res.data
      }).catch(() => {
      })
    },
  },
}
</script>

<style scoped>
.pal-info {
  height: 100%;
  width: 100%;
  padding: 40px;
  display: grid;
  position: relative;
  grid-template-columns: 25% 30% 30%;
  grid-column-gap: 20px;
}

.pal-icon {
  display: flex;
  text-align: left;
  width: 300px
}

.pal-value {
  width: 100%;
  color: #B59758;
  font-size: 24px;
  text-align: left;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.pal-info-name {
  margin-left: 20px;
  width: 100%;
  display: flex;
  font-size: 40px;
}

.pal-info-item {
  color: white;
  height: 30px;
  margin-top: 20px;
  margin-left: 20px;
  width: 100%;
  display: flex;
  align-items: center
}

.pal-info-attribute {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-top: 10px;
}

.pal-passive {
  color: white;
  font-size: 20px;
  border: solid 1px white;
  margin-top: 10px;
  padding: 10px;
}

.pal-skill {
  color: white;
  cursor: pointer;
  font-size: 20px;
  height: 100%;
  border: solid 1px white;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end
}

.skill-attribute {
  clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.skill-desc {
  font-size: 20px;
  width: 300px;
  color: white;
  padding: 10px
}

.pal-title {
  width: 100%;
  text-align: left;
  color: #acc2ef;
  font-size: 30px
}

.quality-item {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
}

.quality-image {
  width: 40px;
  cursor: pointer
}

.info-box {
  width: 100%;
  text-align: left;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.quality-level {
  color: #B59758;
  margin-left: -10px;
  margin-right: 20px
}

.eat {
  display: flex;
  float: left;
  align-items: center
}

.eat-icon {
  width: 20px;
  align-items: center;
  display: flex;
}

</style>
