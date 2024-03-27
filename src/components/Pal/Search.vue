<template>
  <div class="search">
    <el-form :inline="true" ref="form" border="true" @submit.native.prevent>
      <div class="pal-search">
        <div>
          <span style="color: white;">帕鲁名称</span>
          <br>
          <el-form-item>
            <el-input v-model="search"
                      class="pal-search-input"
                      suffix-icon="el-icon-search"
                      @input="Search"
                      @change="Search"
                      @clear="Search"
                      placeholder="请输入搜索内容"></el-input>
          </el-form-item>
        </div>
        <div style="display: flex">
          <div>
            <span style="color: white">帕鲁元素</span>
            <br>
            <el-form-item class="pal-attribute">
              <el-radio-group v-model="attribute" @input="Search">
                <el-radio-button class="attribute-button" v-for="(item,index) in attributeMap"
                                 :key="index"
                                 :label="index"
                                 border
                                 @click.native="setAttribute($event)"
                                 :title="item">
                  <el-image style="width: 30px" :src="getAttributeImage(index)"></el-image>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
          <div style="margin-left: 40px">
            <span style="color: white">帕鲁工作能力</span>
            <br>
            <el-form-item class="pal-attribute">
              <el-radio-group v-model="ability" @input="Search" border>
                <el-radio-button class="attribute-button"
                                 v-for="(item,index) in abilityMap"
                                 :key="index"
                                 :label="index"
                                 border
                                 @click.native="setAbility($event)"
                                 :title="item">
                  <el-image style="width: 30px" :src="getAbilityImage(index)"></el-image>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      attribute: -1,
      lastAttribute: -1,
      ability: -1,
      lastAbility: -1,
      search: '',
      attributeMap: ['无', '暗', '龙', '冰', '火', '草', '土', '雷', '水'],
      abilityMap: ['生火', '浇水', '种植', '发电', '手工', '采集', '伐木', '挖矿', '制药', '冷却', '牧场', '搬运'],
    };
  },
  computed: {
    getAttributeImage: function () {
      return function (id) {
        id = id + 1
        return '/src/assets/icon/' + id + '.png'
      }
    },
    getAbilityImage: function () {
      return function (id) {
        id = id + 1
        return '/src/assets/icon/work_' + id + '.png'
      }
    },
  },
  methods: {
    setAbility(event) {
      if (event.target.type === "radio") {
        if (event.target.value === this.ability.toString()) {
          this.ability = -1
          this.Search()
        }
      }
    },
    setAttribute(event) {
      if (event.target.type === "radio") {
        console.log(event.target.value, this.attribute)
        if (event.target.value === this.attribute.toString()) {
          this.attribute = -1
          this.Search()
        }
      }
    },
    Search() {
      const name = this.search
      const attribute = this.attribute + 1
      const ability = this.ability + 1
      let filterPal = []
      let allPal = this.$store.state.allPal
      if (attribute > 0) {
        for (let index in allPal) {
          let item = allPal[index]
          if (item.attribute_ids.includes(attribute)) {
            filterPal.push(item)
          }
        }
      } else {
        filterPal = allPal
      }
      if (ability > 0) {
        filterPal = filterPal.filter(item => {
          let filter = false
          let abilities = item.abilities
          for (let index in abilities) {
            if (abilities[index].icon === ability) {
              filter = true
            }
          }
          return filter
        })
      }
      if (name !== '') {
        filterPal = filterPal.filter(item => {
          return item.name.indexOf(name) > 0
        })
      }
      this.$store.state.filterPal = filterPal
    }
  }
  ,
}
</script>
<style scoped>

.search {
  margin-top: 40px;
}

.pal-search {
  width: 100%;
  margin-left: 40px;
  text-align: left;
  position: relative;
}

.pal-search-input {
  color: white;
  font-size: 16px;
  margin-top: 10px;
}

.pal-search >>> .el-input__inner {
  background-color: #1f2b3e;
  border-color: #B59758;
  border-width: 1px;
  color: white;
  font-size: 16px;
}

.pal-attribute {
  text-align: left;
  margin-top: 10px;
}

.pal-attribute >>> .el-radio-button__inner {
  background-color: #1f2b3e;
  border: 1px solid #1f2b3e;
  color: white;
  border-radius: 4px;
  padding: 10px;
}

.attribute-button {
  margin-right: 20px;
  width: 50px;
  height: 50px;
}

.pal-attribute >>> .el-radio-button__inner:hover {
  border-color: #B59758;
}

.pal-attribute >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
  border: 1px solid #B59758;
}

</style>
