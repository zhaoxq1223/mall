<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~@/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  border: 2px solid #aaa;
  border-radius: 50%;
}
.check {
  border-color: red;
  background-color: red;
}
</style>
