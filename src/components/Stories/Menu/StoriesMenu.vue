<template>
  <div class="stories-menu">
    <div class="container">
      <div class="stories-menu__content">
        <StoriesMenuSlider />
      </div>
    </div>
  </div>
</template>

<script setup>
import StoriesMenuSlider from '@/components/Stories/Menu/StoriesMenuSlider.vue';

</script>

<style lang="scss" scoped>
.stories-menu {
  overflow: hidden;
}
</style>