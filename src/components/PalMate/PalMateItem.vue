<template>
  <div class="pal-mate" v-cloak>
    <div class="pal-mate-body">
      <div class="search-area">
        <div class="search-parent-area">
          <div class="search-parent-item" style="">
            <div @click="checkClick(1)" :class="{active: activeId===1}" class="parent_one">
              <div v-if="parentOne.id>0" class="search-parent" style="">
                <el-image style="width: 70%" :src="parentOne.icon"></el-image>
                <span style="margin-top: 10px">{{ parentOne.name }}</span>
              </div>
              <div v-else style="font-size: 20px">选择父母</div>
            </div>
            <div style=";font-size: 50px;">+</div>
            <div @click="checkClick(2)" :class="{active: activeId===2}" class="parent_one">
              <div v-if="parentTwo.id>0" class="search-parent">
                <el-image style="width: 70%" :src="parentTwo.icon"></el-image>
                <span style="margin-top: 10px">{{ parentTwo.name }}</span>
              </div>
              <div v-else style="font-size: 20px">选择父母</div>
            </div>
            <div style=";font-size: 50px;">=</div>
            <div @click="checkClick(3)" :class="{active: activeId===3}" class="parent_one">
              <div v-if="result.id>0" class="search-parent">
                <el-image style="width: 70%" :src="result.icon"></el-image>
                <span style="margin-top: 10px">{{ result.name }}</span>
              </div>
              <div v-else style="font-size: 20px">结果选择</div>
            </div>
          </div>
        </div>
        <div>
          <div class="search-pal">
            <span style="color: white;">帕鲁名称</span>
            <br>
            <el-form :inline="true" ref="form" border="true" @submit.native.prevent>
              <el-form-item>
                <el-input v-model="search"
                          class="pal-search-input"
                          suffix-icon="el-icon-search"
                          @input="SearchPal"
                          @change="SearchPal"
                          @clear="SearchPal"
                          placeholder="请输入搜索内容"></el-input>
              </el-form-item>
              <el-button class="reset-button" type="primary" @click="onReset">重置所有选择</el-button>
            </el-form>
          </div>
          <div class="search-pal-list animate__animated  animate__fadeIn animate__slow">
            <div v-for="item in pals" v-show="showPal(item.name)" class="pal-item" @click="setItem(item)">
              <el-image style="width: 80%" :src="item.icon" lazy></el-image>
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pal-mate-result animate__animated  animate__fadeIn animate__slow"
           :infinite-scroll-disabled="disabled"
           infinite-scroll-immediate="false"
           v-infinite-scroll="onLoad">
        <div v-for="item in palMates" style="width: 100%;">
          <div class="mate-result">
            <div class="mate-result-item">
              <div style="display: flex;flex-direction: column">
                <el-image class="mate-pal-image" :src="item.parent_one.icon" lazy></el-image>
                <span>{{ item.parent_one.name }}</span>
              </div>
              <span style="font-size: 24px">+</span>
              <div style="display: flex;flex-direction: column">
                <el-image class="mate-pal-image" :src="item.parent_two.icon" lazy></el-image>
                <span>{{ item.parent_two.name }}</span>
              </div>
              <span style="font-size: 24px">=</span>
              <div style="display: flex;flex-direction: column">
                <el-image class="mate-pal-image" :src="item.result.icon" lazy></el-image>
                <span>{{ item.result.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 40px"></div>
  </div>
</template>

<script>
import {listPalMate} from "~/api/pal-mate/pal-mate";
import {listPal} from "~/api/pals/pals";

export default {
  name: 'PalMateItem',
  data() {
    return {
      pals: [],
      parentOne: {},
      parentTwo: {},
      result: {},
      loading: true,
      finished: false,
      activeId: 1,
      palMates: [],
      page: 1,
      search: '',
      showAll: true,
    }
  },
  computed: {
    showPal: function () {
      return function (name) {
        return name.indexOf(this.search) > 0 || this.showAll
      }
    },
    disabled() {
      return this.loading || this.finished
    }
  },
  created() {
    this.listPal()
  },
  methods: {
    SearchPal() {
      if (this.search === '') {
        this.showAll = true
        return
      }
      this.showAll = false
    },
    checkClick(value) {
      this.activeId = value
    },
    setItem(item) {
      this.palMates = []
      this.page = 1
      if (this.activeId === 1) {
        this.parentOne = item
      } else if (this.activeId === 2) {
        this.parentTwo = item
      } else if (this.activeId === 3) {
        this.result = item
      }
      this.listPalMate()
    },
    listPal() {
      listPal().then(res => {
        this.pals = res.data
      }).catch(() => {
      })
    },
    onClick(params) {
      this.$router.push("/pal/" + params)
    },
    onLoad() {
      this.page++
      this.listPalMate()
    },
    onReset() {
      this.parentOne = {}
      this.parentTwo = {}
      this.result = {}
      this.activeId = 1
      this.palMates = []
      this.search = ''
      this.page = 1
      this.showAll = true
    },
    listPalMate() {
      let params = {
        "parent_one": this.parentOne.id,
        "parent_two": this.parentTwo.id,
        "result": this.result.id,
        "page": this.page
      }
      setTimeout(() => {
        listPalMate(params).then(res => {
          this.palMates = this.palMates.concat(res.data)
          this.loading = false
        }).catch(() => {
        })
      }, 300);
    }
  }
}
</script>

<style scoped>
.active {
  border: solid 2px #b77e0c;
  box-sizing: border-box;
}

.pal-mate {
  width: 100%;
  height: 100%;
  color: white;
}

.pal-mate-body {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 70% auto
}

.parent_one {
  color: white;
  display: grid;
  align-items: center;
  cursor: pointer;
  width: 160px;
  height: 160px;
  background-color: #1f2b3e;
  border-radius: 5px;
}

.pal-item {
  width: 120px;
  height: 130px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
  border: 1px solid #34d0dd;
}

.search-pal-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 10px;
  height: 500px;
  background-color: #153147;
}

.search-pal-list::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.search-pal-list::-webkit-scrollbar-thumb {
  background-color: #34d0dd;
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, .3);
}

.pal-mate-result {
  margin-top: 40px;
  margin-left: 50px;
  height: 800px;
  overflow-y: auto;
  margin-right: 40px;
  background-color: #153147;
  overflow-x: hidden;
  color: white;
}

.pal-mate-result::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.pal-mate-result::-webkit-scrollbar-thumb {
  background-color: #34d0dd;
  width: 3px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, .3);
}

.mate-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #34d0dd;
  padding: 10px;
  margin: 20px 20px;
  border-radius: 10px;

}

.mate-result-item {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;

}

.search-parent {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center
}

.search-area {
  height: 100%;
  margin-left: 40px
}

.search-parent-area {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center
}

.mate-pal-image {
  width: 80px;
  border-radius: 50%;
  border: 1px solid #34d0dd;
  cursor: pointer;
}

.search-parent-item {
  width: 100%;
  margin: 40px 100px;
  display: flex;
  justify-content: space-around;
  align-items: center
}

.pal-search-input {
  color: white;
  font-size: 16px;
  margin-top: 10px;
}

.reset-button {
  color: white;
  font-size: 16px;
  margin-top: 10px;
  background-color: #1f2b3e;
  border-color: #B59758;
  border-width: 1px;
  height: 40px;
  margin-left: 40px;
}

.search-pal {
  height: 80px;
  text-align: left;
}

.search-pal >>> .el-input__inner {
  background-color: #1f2b3e;
  border-color: #B59758;
  border-width: 1px;
  color: white;
  font-size: 16px;
  height: 40px;
}

</style>
