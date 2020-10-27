<template>
  <div class="profile">
    <nav-bar class="navbar">
      <div slot="center"><p>我的</p></div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
</style>
