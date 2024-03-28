<template>
  <div style="width: 100%">
    <div class="pal-item"
         :infinite-scroll-disabled="disabled"
         infinite-scroll-immediate="false"
         v-infinite-scroll="onLoad">
      <div v-for="item in pals" class="item">
        <div @click="onClick(item.id)" class="pal-card">
          <div style="float: left">
            <el-image v-for="id in item.attribute_ids"
                      :key="id"
                      :src="getAttributeImageUrl(id)"
                      class="pal-item-attribute">
            </el-image>
          </div>
          <div>
            <el-image :src="item.icon" class="pal-image" style="margin-top: 10px">
              <el-skeleton-item variant="image" slot="placeholder" animated  style=" width: 100px;height: 100px"/>
            </el-image>
            <div style="margin-top: 20px">
              <span style="color: white;">{{ item.name }}</span>
            </div>
          </div>
          <div>
            <div v-for="ability in item.abilities" class="pal-ability">
              <el-image class="pal-ability-image" :title="ability.name" :src="getAbilityImageUrl(ability.icon)">
              </el-image>
              <span style="color: white;display: flex;align-items:center;">{{ ability.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)"
         element-loading-text="拼命加载中..."
    ></div>
  </div>
</template>

<script>
import {listPal} from "~/api/pals/pals";

export default {
  name: 'PalItem',
  data() {
    return {
      pals: [],
      loading: true,
      finished: false,
      page: 1,
    };
  },
  computed: {
    disabled() {
      return this.loading || this.finished
    },
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
    getFilterPal() {
      return this.$store.state.filterPal
    }
  },
  created() {
    this.listPal()
  },
  watch: {
    getFilterPal: function () {
      this.pals = []
      this.page = 1
      this.finished = false
      this.setPals()
    }
  },
  methods: {
    listPal() {
      setTimeout(() => {
        listPal().then(res => {
          this.$store.state.allPal = res.data
          this.$store.state.filterPal = res.data
          this.loading = false
          this.setPals()
        }).catch(() => {
          this.loading = false
        })
      }, 0)
    },
    onClick(params) {
      this.$router.push("/pal/" + params)
    },
    onLoad() {
      this.loading = true
      this.page++
      setTimeout(() => {
        this.setPals()
        this.loading = false
      }, 0)
    },
    setPals() {
      const filter = this.$store.state.filterPal
      const page = this.page
      const start = (page - 1) * 18
      const end = start + 18
      const l = filter.length
      let pals = this.pals
      pals = pals.concat(filter.slice(start, end))
      if (end > l) {
        this.finished = true
      }
      this.pals = pals
    }
  }
}
</script>

<style scoped>
.pal-item {
  width: 90%;
  height: auto;
  position: relative;
  margin-left: 40px;
  margin-top: 40px;
  display: grid;
  grid-template-columns:repeat(6, 14%);
  grid-auto-columns: auto;
  column-gap: 40px;
}

.item {
  margin-bottom: 40px;
}

.pal-card {
  cursor: pointer;
  display: grid;
  padding: 30px 20px;
  grid-template-columns:15% 60% 25%;
  border: #1f2b3e;
  background-color: #1f2b3e
}

.loading {
  margin-left: 40px;
  height: 100px;
  width: 90%;
}

.pal-image {
  width: 100%;
}

.pal-card {
  transition: transform 0.3s;
}

.pal-card:hover {
  transform: scale(1.1);
}

.pal-ability {
  display: grid;
  grid-template-columns: 70% 30%
}

.pal-ability-image {
  width: 22px;
  cursor: pointer;
  margin-left: 5px
}

</style>



