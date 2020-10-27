<template>
  <div class="category">
    <nav-bar class="navbar">
      <div slot="center"><span>分类</span></div>
    </nav-bar>
    <scroll :probeType="3" class="content">
      <div class="a">
        <div class="calssify">
          <div class="c">分类</div>
          <div class="c">分类</div>
          <div class="c">分类</div>
          <div class="c">分类</div>
          <div class="c">分类</div>
          <div class="c">分类</div>
          <div class="c">分类</div>
          <div class="c">分类</div>
          <div class="c">分类</div>
        </div>
        <div class="cateItems">
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
          <div class="cateItem"></div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
.content {
  height: calc(100% - 49px - 44px);
  overflow: hidden;
}
.a {
  display: flex;
  justify-content: space-between;
}
.calssif {
  background-color: lightseagreen;
}
.c {
  background-color: orange;
  text-align: center;
  line-height: 100px;
  width: 70px;
  height: 100px;
}
.cateItems {
  display: flex;
  width: 300px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.cateItem {
  width: 130px;
  height: 120px;
  background-color: coral;
  margin-bottom: 20px;
}
</style>
