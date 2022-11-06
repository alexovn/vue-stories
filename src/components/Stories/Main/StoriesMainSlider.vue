<template>
  <swiper class="stories-main-slider"
    @swiper="setMainSlider"
    :slides-per-view="swiperOptions.slidesPerView"
    :centeredSlides="swiperOptions.centeredSlides"
    :initialSlide="swiperOptions.initialSlide"
  >
    <swiper-slide
      class="stories-main-slider__item"
      v-for="(story, i) in stories.stories"
      :key="i"
      :style="{ backgroundColor: story.bg }"
      @click="slideTo(i)"
    >

      <StoriesGroupSlider :mainStory="story" />

      <button class="stories-main-slider__item-btn" @click="closeStory">
        <IconClose />
      </button>

    </swiper-slide>

    <div class="stories-main-slider__nav">
      <button
        v-show="isPrevBtnHidden"
        class="stories-main-slider__nav-prev"
        @click="slidePrev()"
      >
        Prev
      </button>
      <button
        v-show="isNextBtnHidden"
        class="stories-main-slider__nav-next"
        @click="slideNext()"
      >
        Next
      </button>
    </div>
  </swiper>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStoriesStore } from '@/stores/stories';
import { Swiper, SwiperSlide } from 'swiper/vue';

import StoriesGroupSlider from '@/components/Stories/Group/StoriesGroupSlider.vue';
import IconClose from '@/components/Icon/IconClose.vue';
import 'swiper/css';

const stories = useStoriesStore();
const mainSlider = ref(null);

const activeSlide = computed(() => {
  return mainSlider.value.slides[mainSlider.value.activeIndex];
});

const sliderGroup = computed(() => {
  return activeSlide.value.querySelector('.stories-group-slider');
});

const setMainSlider = (swiper) => {
  mainSlider.value = swiper;
};

const swiperOptions = ref({
  slidesPerView: 'auto',
  centeredSlides: true,
  initialSlide: stories.storyIndex,
});

const closeStory = () => {
  stories.isStoriesActive = false;
  stories.storyIndex = null;
};

const slideNext = () => {
  if (!sliderGroup.value.swiper.isEnd) {
    sliderGroup.value.swiper.slideNext();
    return;
  }
  mainSlider.value.slideNext();
};

const slidePrev = () => {
  if (!sliderGroup.value.swiper.isBeginning) {
    sliderGroup.value.swiper.slidePrev();
    return;
  }
  mainSlider.value.slidePrev();
};

const isPrevBtnHidden = computed(() => {
  if (mainSlider.value) {
    if (sliderGroup.value.swiper.isBeginning && mainSlider.value.isBeginning) {
      return false;
    }
    return true;
  }
});

const isNextBtnHidden = computed(() => {
  if (mainSlider.value) {
    if (sliderGroup.value.swiper.isEnd && mainSlider.value.isEnd) {
      return false;
    }
    return true;
  }
});

const slideTo = (i) => {
  mainSlider.value.slideTo(i);
};

</script>

<style lang="scss" scoped>
.stories-main-slider {
  overflow: visible;
  width: 100%;

  &__item {
    margin: 0 10vw;
    width: 25rem;
    height: 37.5rem;
    border-radius: 0.75rem;
    transform: scale(0.6);
    transition: transform 0.3s ease;
    position: relative;

    &-btn {
      position: absolute;
      top: -1.5rem;
      right: -1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;

      width: 1.5rem;
      height: 1.5rem;

      :deep(svg) {
        width: 100%;
        height: 100%;
      }
    }

    &.swiper-slide-active {
      width: 25rem;
      height: 37.5rem;
      transform: scale(1);
    }
  }

  &__nav {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 35rem;
    z-index: 100;

    &-prev,
    &-next {
      padding: 0.5rem;
      position: absolute;
      background: transparent;
    }

    &-prev {
      left: 0;
    }

    &-next {
      right: 0;
    }
  }
}
</style>