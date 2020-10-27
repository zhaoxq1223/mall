<template>
  <swiper class="swip">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" @load="imgload" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgload() {
      this.$bus.$emit("detailSwiperImageLoad");
    },
  },
};
</script>

<style scoped>
.swip {
  height: 300px;
  overflow: hidden;
}
</style>
