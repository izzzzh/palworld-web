<template>
  <div style="width: 100%">
    <div class="goods-item"
         :infinite-scroll-disabled="disabled"
         infinite-scroll-immediate="false"
         v-infinite-scroll="onLoad">
      <div v-for="item in goods"
           class="item">
        <el-tooltip effect="dark" placement="top" :open-delay="500">
          <div slot="content" style="width: 400px;font-size: 16px;padding: 10px">
            <div style="color: #B59758;font-size: 18px">{{ item.name }}</div>
            <el-divider></el-divider>
            <span>{{ item.description }}</span>
            <div v-show="item.materials.length > 0">
              <el-divider></el-divider>
              <div style="display: flex;flex-wrap: wrap">
                <div v-for="material in item.materials" style="width: 50%;display: flex;flex-direction: row">
                  <el-image class="material-image" :src="'/src/assets'+material.image"></el-image>
                  <div class="material-name">{{ material.count }} {{ material.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-card class="goods-card" :style="{backgroundColor:bgColor(item.quality)}">
            <el-image :src="'/src/assets'+item.image"
                      class="goods-image" lazy>
              <div slot="error" class="image-slot" style="color: white;margin-top: 50px">
                <span class="dot">加载失败</span>
              </div>
            </el-image>
            <div style="padding: 10px;"></div>
            <div style="color: white;font-size: 13px">
              <span>{{ getQuality(item.name, item.quality) }}</span>
            </div>
          </el-card>
        </el-tooltip>
      </div>
    </div>
    <div class="loading" v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)"
         element-loading-text="拼命加载中..."
    ></div>
  </div>

</template>

<script>
import {listGoods} from "~/api/goods/goods";

export default {
  name: 'GoodsItem',
  computed: {
    bgColor: function () {
      return function (quality) {
        if (quality < 1) {
          return '#1f2b3e'
        }
        return this.$store.state.qualityColor[quality]
      }
    },
    getGoodsName() {
      return this.$store.state.goodsName
    },
    getGoodsTypes() {
      return this.$store.state.goodsTypes
    },
    getGoodsQuality() {
      return this.$store.state.goodsQuality
    },
    disabled() {
      return this.loading || this.finished
    },
  },
  watch: {
    getGoodsName: function () {
      this.startSearch()
    },
    getGoodsTypes: function () {
      this.startSearch()
    },
    getGoodsQuality: function () {
      this.startSearch()
    }
  },
  data() {
    return {
      goods: [],
      page: 1,
      pageSize: 21,
      loading: true,
      finished: false
    };
  },
  created() {
    let params = {
      "page": this.page,
      "page_size": this.pageSize
    }
    this.listGoods(params)
  },
  methods: {
    startSearch() {
      this.goods = []
      this.page = 1
      let params = {
        "name": this.$store.state.goodsName,
        "types": this.$store.state.goodsTypes,
        "quality": this.$store.state.goodsQuality,
        "page": this.page,
        "page_size": this.pageSize
      }
      this.listGoods(params)
    },
    listGoods(params) {
      this.loading = true
      setTimeout(() => {
        listGoods(params).then(res => {
          this.goods = this.goods.concat(res.data)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 300)
    },
    getQuality(name, quality) {
      if (quality > 1) {
        return name + '(' + this.$store.state.qualityMap[quality] + ')'
      }
      return name
    },
    onLoad() {
      this.page++
      let params = {
        "name": this.$store.state.goodsName,
        "types": this.$store.state.goodsTypes,
        "quality": this.$store.state.goodsQuality,
        "page": this.page,
        "page_size": this.pageSize
      }
      this.listGoods(params)
    },
  }
}
</script>

<style scoped>
.goods-item {
  width: 85%;
  height: auto;
  position: relative;
  margin-left: 40px;
  margin-top: 40px;
  display: grid;
  grid-template-columns:repeat(7, 12%);
  grid-auto-columns: auto;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
}

.item {
  height: 200px;
}

.goods-image {
  margin-top: 10px;
  height: 100px
}

.goods-card {
  cursor: pointer;
  height: 200px;
  border: #1f2b3e;
  transition: transform 0.3s;
}

.loading {
  margin-left: 40px;
  height: 100px;
  width: 85%;
}

.goods-card:hover {
  transform: scale(1.1);
}

.material-image {
  width: 50px;
  border: 1px solid #34d0dd;
  margin-bottom: 10px;
  border-radius: 5px;
}

.material-name {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

</style>
