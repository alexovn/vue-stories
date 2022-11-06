<template>
  <div v-if="stories.isStoriesActive" class="stories-main-wrapper">
    <div class="stories-main-wrapper__content">
      <StoriesMainSlider />
    </div>
  </div>
</template>

<script setup>
import StoriesMainSlider from '@/components/Stories/Main/StoriesMainSlider.vue';
import { useStoriesStore } from '@/stores/stories';

const stories = useStoriesStore();

</script>

<style lang="scss" scoped>
.stories-main-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  align-items: center;

  background-color: rgba(#000, 0.3);

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
}
</style>