<template>
  <div style="width: 100%">
    <div class="goods-item"
         :infinite-scroll-disabled="disabled"
         infinite-scroll-immediate="false"
         v-infinite-scroll="onLoad">
      <div v-for="item in goods"
           class="item">
        <el-card class="goods-card" :style="{backgroundColor:bgColor(item.quality)}" >
          <el-image :src="item.image"
                    class="goods-image" lazy>
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
    bgColor: function () {
      return function (quality) {
        if (quality < 2) {
          return '#1f2b3e'
        }
        return this.$store.state.qualityColor[quality - 1]
      }
    },
    getFilterGoods() {
      return this.$store.state.filterGoods
    },
    disabled() {
      return this.loading || this.finished
    },
  },
  watch: {
    getFilterGoods: function () {
      this.goods = []
      this.page = 1
      this.finished = false
      this.setGoods()
    }
  },
  data() {
    return {
      goods: [],
      page: 1,
      loading: true,
      finished: false
    };
  },
  created() {
    this.listGoods()
  },
  methods: {
    listGoods() {
      setTimeout(() => {
        list().then(res => {
          this.$store.state.allGoods = res.data
          this.$store.state.filterGoods = res.data
          this.loading = false
          this.setGoods()
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
    },
    onLoad() {
      this.loading = true
      this.page++
      setTimeout(() => {
        this.setGoods()
        this.loading = false
      }, 100)
    },
    setGoods() {
      const filter = this.$store.state.filterGoods
      const page = this.page
      const start = (page - 1) * 21
      const end = start + 21
      const l = filter.length
      let goods = this.goods
      goods = goods.concat(filter.slice(start, end))
      if (end > l) {
        this.finished = true
      }
      this.goods = goods
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

.goods-card {
  cursor: pointer;
  height: 200px;
  border: #1f2b3e;
}

.loading {
  margin-left: 40px;
  height: 100px;
  width: 85%;
}

.goods-card {
  transition: transform 0.3s;
}

.goods-card:hover {
  transform: scale(1.1);
}

</style>
