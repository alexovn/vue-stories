<template>
  <swiper class="stories-group-slider" :modules="swiperOptions.modules" :pagination="swiperOptions.pagination">
    <swiper-slide class="stories-group-slider__item" :style="{ backgroundColor: story.bg }"
      v-for="(story, i) in mainStory.storiesGroup" :key="i">
      <div class="stories-group-slider__item-body">
        {{ story.title }}
      </div>
    </swiper-slide>

    <div class="swiper-pagination stories-group-slider__pagination"></div>
  </swiper>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import 'swiper/css';

const props = defineProps({
  mainStory: {
    type: Object,
    default: () => ({})
  }
});

const swiperOptions = ref({
  modules: [Pagination],
  pagination: {
    el: ".stories-group-slider__pagination",
    type: "bullets",
    clickable: false,
    renderBullet: function (index, className) {
      return (
        '<div class="' + className + '">' + "<span>" + "</span>" + "</div>"
      );
    },
  }
});


</script>

<style lang="scss" scoped>
.stories-group-slider {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  @include r($sm) {
    border-radius: 0;
  }

  &__item {
    padding: 0.5rem;
    width: 100%;
    height: 100%;

    &-body {
      @include text20;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;

      @include r($sm) {
        font-size: 25px;
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 2rem;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s ease;

    @include r($sm) {
      top: 4rem;
    }

    :deep(.swiper-pagination-bullet) {
      position: relative;
      width: 100%;
      flex-shrink: 10;
      border-radius: 999px;
      height: 4px;
      background-color: rgba(#1f2938, 0.16);
      overflow: hidden;
      box-shadow: 0 0 1px #00000059;

      margin-right: 0.9rem;

      &:first-child {
        margin-left: 2rem;
      }

      &:last-child {
        margin-right: 2rem;
      }

      span {
        position: absolute;
        background-color: #1f2938;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 999px;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
    }
  }
}
</style>