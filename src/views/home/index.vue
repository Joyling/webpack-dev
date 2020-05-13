<template>
  <div>
    <card/>
    <div>
  <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
  <el-link type="primary">主要链接</el-link>
  <el-link type="success">成功链接</el-link>
  <el-link type="warning">警告链接</el-link>
  <el-link type="danger">危险链接</el-link>
  <el-link type="info">信息链接</el-link>
  <div>
    <p v-for="(news, index) in newsList.result" :key="index">{{news.title}}</p>
  </div>
</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("home");
export default {
  data() {
    return {
      newsList: []
    }
  },
  methods: {
    ...mapActions(["getNewsList"]),
    async initList() {
      this.newsList = await this.getNewsList();
    }
  },
  mounted() {
    this.initList();
  }
}
</script>