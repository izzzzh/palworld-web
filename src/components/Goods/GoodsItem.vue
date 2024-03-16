<template>
  <div style="width: 100%">
    <div class="goods-item">
      <div v-for="item in goods"
           v-show="isVisited(item)"
           class="item">
        <el-card class="demo-image__lazy" :style="{backgroundColor:bgColor(item.quality)}">
          <el-image :src="item.image"
                    class="goods-image">
            <div slot="placeholder" class="image-slot" style="color: white">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot" style="color: white;margin-top: 50px">
              <span class="dot">加载失败</span>
            </div>
          </el-image>
          <div style="padding: 10px;"></div>
          <div style="color: white;font-size: 13px">
            <span>{{ getQuality(item.name, item.quality) }}</span>
          </div>
        </el-card>
      </div>
    </div>
    <div class="loading" v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)"
         element-loading-text="拼命加载中..."
    ></div>
  </div>

</template>

<script>
import {list} from "~/api/goods/goods";

export default {
  name: 'GoodsItem',
  computed: {
    isVisited: function () {
      return function (item) {
        let name = this.$store.state.goodsName
        let quality = this.$store.state.goodsQuality
        let validName = item.name.indexOf(name) > 0
        let validQuality = item.quality === quality
        if (quality > 0 && name !== "") {
          return validName && validQuality
        } else if (quality > 0) {
          return validQuality
        } else if (name !== "") {
          return validName
        }
        return true
      }
    },
    bgColor: function () {
      return function (quality) {
        if (quality < 2) {
          return '#1F3A4F'
        }
        return this.$store.state.qualityColor[quality - 1]
      }
    }
  },
  data() {
    return {
      goods: [],
      loading: true
    };
  },
  created() {
    this.listGoods()
  },
  methods: {
    listGoods() {
      setTimeout(() => {
        list().then(res => {
          this.goods = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 300)
    },
    getQuality(name, quality) {
      if (quality > 1) {
        return name + '(' + this.$store.state.qualityMap[quality - 1] + ')'
      }
      return name
    }
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

.demo-image__lazy {
  height: 200px;
  border: #1F3A4F;
}

.loading {
  margin-left: 40px;
  height: 100px;
  width: 85%;
}

</style>
