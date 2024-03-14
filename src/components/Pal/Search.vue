<template>
  <div class="search">
    <el-form :inline="true" ref="form" border="true" @submit.native.prevent>
      <div class="pal-search">
        <el-form-item>
          <el-input v-model="search"
                    suffix-icon="el-icon-search"
                    @input="setSearch"
                    @change="setSearch"
                    @clear="setSearch"
                    placeholder="请输入搜索内容"></el-input>
        </el-form-item>
        <el-form-item class="pal-attribute">
          <el-radio-group v-model="attribute" @input="setAttribute">
            <el-radio-button v-show="false"></el-radio-button>
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="无"></el-radio-button>
            <el-radio-button label="暗"></el-radio-button>
            <el-radio-button label="龙"></el-radio-button>
            <el-radio-button label="冰"></el-radio-button>
            <el-radio-button label="火"></el-radio-button>
            <el-radio-button label="草"></el-radio-button>
            <el-radio-button label="土"></el-radio-button>
            <el-radio-button label="雷"></el-radio-button>
            <el-radio-button label="水"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      attribute: '全部',
      search: ''
    };
  },
  methods: {
    setAttribute(value) {
      let id = this.$store.state.attributeMap.indexOf(value)
      this.$store.state.attributeId = id
      this.$store.state.allAttribute = id === 0;
    },
    setSearch(name) {
      this.$store.state.palSearchName = name.trim()
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.palSearchName = ""
    this.$store.state.a = ""
    next()
  }
}
</script>
<style scoped>

.search {
  height: 60px;
  margin-top: 40px;
}

.pal-search {
  width: 100%;
  height: 50px;
  margin-left: 40px;
  text-align: left;
  position: relative;
}

.pal-search >>> .el-input__inner {
  background-color: #464452;
  border-color: #B59758;
  border-width: 1px;
  height: 50px;
  color: white;
  font-size: 16px;
}

.pal-attribute {
  height: 50px;
  margin-left: 40px;
  text-align: left;
}

.pal-attribute >>> .el-radio-button__inner {
  background-color: #464452;
  border-top: 1px solid #464452;
  border-bottom: 1px solid #464452;
  border-right: 1px solid #B59758;
  height: 50px;
  width: 70px;
  color: white;
  padding-top: 17px;
}

.pal-attribute >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border-color: #B59758;
  color: #B59758;
  font-weight: bolder;
  font-size: 16px;
  box-shadow: -3px 5px 5px 1px #B59758;
}

.pal-attribute >>> .el-radio-button:first-child .el-radio-button__inner {
  box-shadow: -3px 5px 5px 1px #B59758;
}


.pal-attribute >>> .el-radio-button:first-child:checked .el-radio-button__inner {
  border-color: #B59758;
  color: #B59758;
  font-weight: bolder;
  box-shadow: -3px 5px 5px 1px #B59758;
}

</style>
