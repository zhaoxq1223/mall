<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";
// import Toast from "@/components/common/toast/Toast";

import { debounce } from "@/common/utils";
import { itemListenerMixin } from "@/common/mixin";
import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    // Toast,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message: "",
      // show: false,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求数据
    getDetail(this.iid).then((res) => {
      //console.log(res);
      const data = res.result;
      //1.获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.保存商品详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = data.itemParams;
      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {
      //   //根据最新的数据，对应的DOM已经渲染
      //   //但图片还没有加载完成
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log("themeTopYs");
      // });
    });
    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
    //4.给ThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 300);
  },
  mounted() {},
  methods: {
    ...mapActions(["addCart"]),
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    detailImageLoad() {
      this.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      //获取Y值
      const positionY = -position.y;
      //与主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        //   if (
        //     this.currentIndex !== i &&
        //     ((i < length - 1 &&
        //       positionY >= this.themeTopYs[i] &&
        //       positionY < this.themeTopYs[i + 1]) ||
        //       (i === length - 1 && positionY >= this.themeTopYs[i]))
        //   ) {
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex;
        //   }
        // }
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY <= this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //是否显示回到顶部
      this.isShowBackTop = Math.abs(positionY) > 1000;
    },
    addToCart() {
      //1.获取购物车展示信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车(promise||mapAcrions)
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      this.addCart(product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show(res, 2000);
      });
    },
  },
  destroyed() {
    //取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px - 3rem);
}
</style>
