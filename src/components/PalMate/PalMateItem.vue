<template>
  <div style="width: 100%" v-cloak>
    <div class="pal-mate-item"
         :infinite-scroll-disabled="disabled"
         infinite-scroll-immediate="false"
         v-infinite-scroll="onLoad">
      <div v-for="item in this.$store.state.palMate"
           class="pal-mate-image ">
        <el-card class="demo-image__lazy" style="margin-left: 40px">
          <el-image :src="item.parent_one.icon"
                    class="mate-icon" lazy>
            <div slot="placeholder" class="image-slot" style="color: white">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot" style="color: white;margin-top: 50px">
              <span class="dot">加载失败</span>
            </div>
          </el-image>
          <div style="color: black;font-size: 16px">
            <span>{{ item.parent_one.name }}</span>
          </div>
        </el-card>
        <span style="font-size: 50px;color: white">+</span>
        <el-card class="demo-image__lazy">
          <el-image :src="item.parent_two.icon" class="mate-icon" lazy>
            <div slot="placeholder" class="image-slot" style="color: white">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot" style="color: white;margin-top: 50px">
              <span class="dot">加载失败</span>
            </div>
          </el-image>
          <div style="color: black;font-size: 16px">
            <span>{{ item.parent_two.name }}</span>
          </div>
        </el-card>
        <span style="font-size: 50px;color:white">=</span>
        <el-card class="demo-image__lazy" style="margin-right: 40px">
          <el-image :src="item.result.icon" class="mate-icon" lazy>
            <div slot="placeholder" class="image-slot" style="color: white">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot" style="color: white;margin-top: 50px">
              <span class="dot">加载失败</span>
            </div>
          </el-image>
          <div style="color: black;font-size: 16px">
            <span>{{ item.result.name }}</span>
          </div>
        </el-card>
      </div>
    </div>
    <div class="loading" v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)"
         element-loading-text="拼命加载中..."></div>
    <div v-if="finished" class="loading" style="color: white">没有更多了</div>
  </div>
</template>

<script>
import {listPalMate} from "~/api/pal-mate/pal-mate";

export default {
  name: 'PalMateItem',
  data() {
    return {
      page: 1,
      loading: true,
      finished: false
    }
  },
  computed: {
    disabled() {
      return this.loading || this.finished
    }
  },
  created() {
    this.initPalMate()
  },
  methods: {
    onLoad() {
      this.loading = true
      let params = {
        "parent_one": this.$store.state.parentOne,
        "parent_two": this.$store.state.parentTwo,
        "result": this.$store.state.result,
        "page": this.page
      }
      this.listPalMate(params)
    },
    initPalMate() {
      this.listPalMate()
    },
    listPalMate(params) {
      this.loading = true
      this.finished = false
      setTimeout(() => {
        listPalMate(params).then(res => {
          this.$store.state.palMate = this.$store.state.palMate.concat(res.data)
          this.loading = false
          this.finished = false
          if (res.data.length < 20) {
            this.finished = true
            return
          }
          this.page++
        }).catch(() => {
          this.loading = false
          this.finished = true
        })
      }, 300);
    }
  }
}
</script>

<style scoped>
.pal-mate-item {
  width: 100%;
  height: auto;
  position: relative;
  display: grid;
  grid-template-columns: 45% 45%;
  grid-auto-columns: auto;
  margin-top: 40px;
}

.pal-mate-image {
  height: 220px;
  float: left;
  display: flex;
  margin-left: 40px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: #1F3A4F;
  border: solid 1px white;
  border-radius: 20px;
}

.mate-icon {
  width: 80px;
  border-radius: 50%;
  background-color: white;
}

.demo-image__lazy {
  border: 0;
  width: 150px;
  border-radius: 20px;
  background-color: #B59758;
}

.loading {
  margin-left: 40px;
  height: 100px;
  width: 90%;
}

</style>
