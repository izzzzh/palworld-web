<template>
  <div class="comment">
    <el-input
        type="textarea"
        :rows="2"
        style="width: 100%;font-size: 18px"
        placeholder="请输入评论"
        v-model="comment">
    </el-input>
    <div style="margin-top: 20px;color: white;display: flex;justify-content: space-between">
      <div v-if="getUsername !== ''" style="display: flex;align-items: center;font-size: 16px">
        <el-image :src="getAvatar" style="width: 40px;border-radius: 50%"></el-image>
        <span style="margin-left: 10px">{{ getUsername }}</span>
      </div>
      <div v-else style="display: flex;align-items: center" @click="login">
        <el-link :underline="false" style="color: white;font-size: 16px">登录</el-link>
      </div>
      <el-button class="submit-button" type="primary" @click="submitComment">提交评论</el-button>
    </div>
    <el-divider></el-divider>
    <div style="margin-top: 20px;color: white">
      <div style="text-align: left">全部评论</div>
      <div>
        <div v-for="item in comments"
             :key="item.id"
             style="display: grid;grid-template-columns: 10% 90%;border-bottom: solid 1px #036171;padding: 15px">
          <div>
            <el-image :src="item.avatar" style="width: 40px;border-radius: 50%"></el-image>
          </div>
          <div style="text-align: left;padding-left: 10px">
            <div style="margin-bottom: 10px;font-size: 14px;font-weight: bold;color: #B59758">
              {{ item.username }}
            </div>
            <div style="margin-bottom: 10px;font-size: 20px">{{ item.content }}</div>
            <div style="font-size: 14px">
              <span>{{ item.create_time }}</span>
              <span class="reply" style="" @click="reply(item.id)">
                <i class="el-icon-chat-dot-round"></i><span>&nbsp;回复</span>
              </span>
            </div>
            <div v-if="replyIndex === item.id"
                 style="margin-top: 10px;display: grid;grid-template-columns: 80% 20%">
              <el-input
                  style="width: 100%;font-size: 14px;"
                  placeholder="请输入评论"
                  type="textarea"
                  v-model="replyComment">
              </el-input>
              <el-button type="primary" @click="submitReply(item.id)">回复</el-button>
            </div>
            <div>
              <div v-for="child in item.children"
                   style="display: grid;grid-template-columns: 10% 90%;padding-top:10px;">
                <div>
                  <el-image :src="child.avatar" style="width: 40px;border-radius: 50%"></el-image>
                </div>
                <div style="text-align: left;padding-left: 10px">
                  <div style="margin-bottom: 10px;font-size: 14px;font-weight: bold;color: #B59758">
                    {{ child.username }}&nbsp;回复：@{{ child.username }}
                  </div>
                  <div style="margin-bottom: 10px;font-size: 20px">{{ child.content }}</div>
                  <div style="font-size: 14px">
                    <span>{{ child.create_time }}</span>
                    <span class="reply" style="" @click="reply(child.id)"><i
                        class="el-icon-chat-dot-round"></i><span>&nbsp;回复</span></span>
                  </div>
                  <div v-if="replyIndex === child.id"
                       style="margin-top: 10px;display: grid;grid-template-columns: 80% 20%">
                    <el-input
                        style="width: 100%;font-size: 14px;"
                        placeholder="请输入评论"
                        type="textarea"
                        v-model="childComment">
                    </el-input>
                    <el-button slot="append" type="primary" @click="submitReply(child.id)">回复</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getToken, getUserInfo} from "~/utils/auth";
import {addComment, listComments} from "~/api/comments/comments";
import FormData from "form-data";

export default {
  name: 'Comment',
  data() {
    return {
      comment: "",
      replyComment: "",
      childComment: "",
      // 评论列表
      comments: [],
      // 评论分页
      commentPage: {
        page: 1,
        limit: 5,
        total: 0
      },
      replyIndex: -1,
    }
  },
  computed: {
    getUsername() {
      if (getToken() === "") {
        return ""
      }
      let userInfo = JSON.parse(getUserInfo());
      return userInfo.username
    },
    getAvatar() {
      if (getToken() === "") {
        return ""
      }
      let userInfo = JSON.parse(getUserInfo());
      return userInfo.avatar
    }
  },
  created() {
    this.getComments();
  },
  methods: {
    // 提交评论
    login() {
      this.$store.state.dialogVisible = true
    },
    reply(parent_id) {
      if (this.replyIndex === parent_id) {
        this.replyIndex = -1
        return
      }
      this.replyIndex = parent_id
      this.replyComment = ""
    },
    async submitReply(parent_id) {
      let data = new FormData()
      data.append("object_id", this.$route.params.id)
      data.append("category", "pal")
      data.append("content", this.replyComment)
      data.append("user_id", JSON.parse(getUserInfo()).userId)
      data.append("root_id", parent_id)
      data.append("parent_id", parent_id)
      this.addComment(data)
      this.replyComment = "";
      this.getComments();
    },
    submitComment() {
      if (!getToken()) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        });
        return;
      }
      let data = new FormData()
      data.append("object_id", this.$route.params.id)
      data.append("category", "pal")
      data.append("content", this.comment)
      data.append("user_id", JSON.parse(getUserInfo()).userId)
      data.append("root_id", 0)
      data.append("parent_id", 0)
      this.addComment(data)
      this.comment = "";
      this.getComments();
    },
    getComments() {
      let id = this.$route.params.id
      let params = {
        "object_id": id,
        "category": "pal",
        "page": 1,
        "page_size": 10,
      }
      listComments(params).then(res => {
        this.comments = res.data.list
      }).catch(() => {
      })
    },
    addComment(data) {
      addComment(data).then(res => {
        this.$message({
          message: '评论成功',
          type: 'success'
        });
      }).catch(() => {
        this.$message({
          message: '评论失败',
          type: 'error'
        });
      })
    }
  }
}
</script>

<style scoped>
.comment {
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #374357;
}

.submit-button {
  color: white;
  font-size: 16px;
  margin-top: 10px;
  background-color: #1f2b3e;
  border-color: #B59758;
  border-width: 1px;
  height: 40px;
  margin-left: 40px;
}

.submit-button:hover {
  background-color: #B59758;
}

.reply {
  cursor: pointer;
  margin-left: 10px;
}

.reply:hover {
  color: #34d0dd;
}
</style>
