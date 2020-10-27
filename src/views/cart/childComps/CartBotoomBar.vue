<template>
  <div class="bottom-bar">
    <div class="check-contnet">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算:({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (this.checkLength === 0) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      //return !(this.cartList.filter((item) => !item.checked).length);
      return this.cartList.length === 0
        ? false
        : !this.cartList.filter((item) => !item.checked).length;
    },
  },
};
</script>

<style>
.bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
}
.check-contnet {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 8px;
}
.price {
  margin-left: 40px;
}
.calculate {
  width: 100px;
  position: absolute;
  right: 0;
  background: rgb(255, 105, 105);
  color: #fff;
  text-align: center;
}
</style>
