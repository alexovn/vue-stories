<template>
  <swiper class="stories-group-slider"
  >
    <swiper-slide class="stories-group-slider__item"
      v-for="(story, i) in mainStory.storiesGroup"
      :key="i"
      :style="{ backgroundColor: story.bg }"
    >
      <div class="stories-group-slider__item-title">
        {{ story.title }}
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import {ref} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const props = defineProps({
  mainStory: {
    type: Object,
    default: () => ({})
  }
});

const swiperOptions = ref({
});


</script>

<style lang="scss" scoped>
.stories-group-slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.75rem;

  &__item {
    padding: 0.5rem;
    width: 100%;
    height: 100%;

    &-title {}

    &-text {}
  }
}
</style>