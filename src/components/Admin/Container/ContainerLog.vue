<template>
  <el-drawer
      :title="this.$route.query.id"
      :append-to-body="true"
      :modal-append-to-body="true"
      :visible.sync="drawer"
      :direction="direction"
      size="75%"
      :before-close="handlerClose"
      custom-class="log-drawer"
  >
    <div class="container-log" ref="scrollContainer">
      <div v-for="item in events">
        <span style="color: #34d0dd">{{ item.timestamp }}</span>
        {{ item.message }}
      </div>
    </div>
  </el-drawer>
</template>

<script>
import {fetchEventSource} from '@microsoft/fetch-event-source';
import {getToken} from "~/utils/auth";

export default {
  name: "ContainerLog",
  data() {
    return {
      events: [],
      direction: 'rtl',
      drawer: true,
      ctrl: new AbortController(),
    }
  },
  created() {
    this.startListening()
  },
  beforeRouteLeave(to, form, next) {
    this.ctrl.abort()
    next()
  },
  methods: {
    handlerClose() {
      this.ctrl.abort()
      this.$router.push("/admin/containers")
    },
    startListening() {
      let id = this.$route.query.id.toString()
      let devUrl = 'http://127.0.0.1:8888/api/v1/containers/logs?id=' + id
      let proUrl = 'https://ppcat.fun/api/v1/containers/logs?id=' + id

      let outerThis = this

      fetchEventSource(proUrl, {
        method: 'get',
        headers: {
          'Authorization': getToken(),
          'Content-Type': 'text/event-stream',
          'Connection': 'keep-alive',
        },
        stream: true,
        signal: this.ctrl.signal,
        openWhenHidden: true,
        async onmessage(msg) {
          if (msg.data !== '') {
            const data = JSON.parse(msg.data);
            data.timestamp = new Date(data.timestamp).toLocaleString()
            outerThis.events.push(data)
            outerThis.$nextTick(() => {
              const container = outerThis.$refs.scrollContainer;
              container.scrollTop = container.scrollHeight;
            });
          }
        },
        async onclose() {
          this.ctrl.abort()
        },
        async onerror(err) {
          this.ctrl.abort()
          throw err
        }
      });
    },
  }
}
</script>

<style scoped>
.container-log {
  height: 95%;
  margin: 20px;
  padding: 20px;
  font-size: 18px;
  background-color: #0F1C2E;
  color: white;
  border-radius: 10px;
  overflow-y: auto;
}

.container-log::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.container-log::-webkit-scrollbar-thumb {
  background-color: #B59758;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

.container-log::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.log-drawer >>> .el-drawer__body {
  overflow-y: hidden;
}

</style>
