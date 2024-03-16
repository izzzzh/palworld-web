<template>
  <div style="width: 100%">
    <div class="pal-item">
      <div v-for="item in pals"
           v-show="isVisited(item)"
           class="item">
        <el-card @click.native="onClick(item.id)" class="demo-image__lazy">
          <div class="pal-image-top">
            <div style="margin-right: auto">
              <el-image v-for="id in item.attribute_ids"
                        :key="id"
                        :src="getAttributeImageUrl(id)"
                        class="pal-item-attribute">
              </el-image>
            </div>
            <div class="pal-number">{{ item.number }}</div>
          </div>
          <el-image :src="item.icon" style="margin-top: 10px">
            <div slot="placeholder" class="image-slot"></div>
          </el-image>
          <div style="padding: 10px;"></div>
          <div>
            <span style="color: white">{{ item.name }}</span>
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
import {listPal} from "~/api/pals/pals";

export default {
  name: 'PalItem',
  data() {
    return {
      pals: [],
      loading: true,
    };
  },
  computed: {
    getAttributeImageUrl: function () {
      return function (id) {
        return 'http://120.78.196.38/palworld/images/icons/' + id + '.png'
      }
    },
    allAttribute() {
      return this.$store.state.allAttribute;
    },
    isVisited: function () {
      return function (item) {
        let attributeId = this.$store.state.attributeId
        let name = this.$store.state.palSearchName
        if (attributeId === 0 && name === "") {
          return true
        } else if (attributeId > 0 && name !== "") {
          return item.attribute_ids.indexOf(attributeId) >= 0 && item.name.indexOf(name) >= 0
        } else if (attributeId > 0) {
          return item.attribute_ids.indexOf(attributeId) >= 0
        } else {
          return item.name.indexOf(name) >= 0
        }
      }
    },
  },
  created() {
    this.listPal()
  },
  methods: {
    listPal() {
      setTimeout(() => {
        listPal().then(res => {
          this.pals = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 300)
    },
    onClick(params) {
      this.$router.push("/pal/"+params)
    }
  }
}
</script>

<style scoped>
.pal-item {
  width: 85%;
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
  height: 300px;
  margin-bottom: 40px;
}

.pal-image-top {
  display: flex;
  width: 100%;
  justify-content: flex-end
}

.demo-image__lazy {
  border: #1F3A4F;
  background-color: #1F3A4F
}

.pal-number {
  color: white;
  font-size: 30px;
  height: 30px;
  text-align: center;
}

.pal-item-attribute {
  height: 30px;
  width: 30px;
}

.loading {
  margin-left: 40px;
  height: 100px;
  width: 85%;
}
</style>



