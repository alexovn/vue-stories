<template>
  <swiper class="stories-main-slider"
    ref="storiesMainSlider"
    :slides-per-view="swiperOptions.slidesPerView"
    :centeredSlides="swiperOptions.centeredSlides"
    :initialSlide="swiperOptions.initialSlide"
    @swiper="setMainSlider"
    @slideChange="onSlideChange"
    @touchStart="onTouchStart"
    @touchEnd="onTouchEnd"
  >

    <swiper-slide
      class="stories-main-slider__item"
      :style="{ backgroundColor: story.bg }"
      v-for="(story, i) in stories.stories"
      :key="i"
      @click="slideTo(i, speed)"
    >

      <StoriesGroupSlider
        :mainStory="story"
        @swiper="setGroupSlider"
        @slideChange="onSlideChange"
      />

      <button
        class="close-btn stories-main-slider__item-btn"
        @click="closeStory"
      >
        <IconClose />
      </button>

    </swiper-slide>

    <div class="stories-main-slider__nav"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <button
        class="stories-main-slider__nav-prev"
        v-show="isPrevBtnHidden"
        @click="slidePrev()"
      >
        <IconChevronRight />
      </button>
      <button
        class="stories-main-slider__nav-next"
        v-show="isNextBtnHidden"
        @click="slideNext()"
      >
        <IconChevronRight />
      </button>
    </div>

    <button
      class="close-btn stories-main-slider__btn"
      @click="closeStory"
    >
      <IconClose />
    </button>

  </swiper>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStoriesStore } from '@/stores/stories';
import { Swiper, SwiperSlide } from 'swiper/vue';

import StoriesGroupSlider from '@/components/Stories/Group/StoriesGroupSlider.vue';
import IconClose from '@/components/Icon/IconClose.vue';
import IconChevronRight from '@/components/Icon/IconChevronRight.vue';
import 'swiper/css';

const stories = useStoriesStore();
const mainSlider = ref(null);
const groupSlider = ref(null);
const autoplayDelay = ref(5000);
const speed = ref(500);
const isPaused = ref(false);
let interval = ref(null);
const storiesMainSlider = ref(null);

const activeSlide = computed(() => {
  return mainSlider.value?.slides[activeIndex.value];
});

const sliderGroup = computed(() => {
  return activeSlide.value.querySelector('.stories-group-slider');
});

const activeIndex = computed(() => {
    return mainSlider.value?.activeIndex;
});

const setActiveIndex = () => {
  stories.storyIndex = activeIndex.value;
};

const setMainSlider = (swiper) => {
  mainSlider.value = swiper;
  setProgress();
  slideTo(stories.storyIndex);
};

const setGroupSlider = (swiper) => {
  groupSlider.value = swiper;
};

const swiperOptions = ref({
  slidesPerView: 'auto',
  centeredSlides: true,
});

const closeStory = () => {
  stopProgress();
  stories.isStoriesActive = false;
  stories.storyIndex = null;
};

const slideNext = () => {
  if (!sliderGroup.value.swiper.isEnd) {
    sliderGroup.value.swiper.slideNext(speed.value);
    return;
  }
  mainSlider.value.slideNext();
};

const slidePrev = () => {
  if (!sliderGroup.value.swiper.isBeginning) {
    sliderGroup.value.swiper.slidePrev(speed.value);
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

const slideTo = (i, speed = 0) => {
  mainSlider.value.slideTo(i, speed);
};

const setProgress = () => {
  const bullets = sliderGroup.value.querySelectorAll('.swiper-pagination-bullet');
  const time = autoplayDelay.value / 100;

  bullets.forEach((bullet, index) => {
    const span = bullet.querySelector('span');
    span.style.transform = 'translateX(-100%)';

    if (index === sliderGroup.value.swiper.activeIndex) {
      let transform = -100;

      interval.value = setInterval(() => {

        transform < 0 && !isPaused.value ? transform += 1 : false;
        span.style.transform = `translateX(${transform}%)`;

        if (sliderGroup.value.swiper.isEnd && transform === 0) {
          stopProgress();

          mainSlider.value.isEnd ? closeStory() : false;
          mainSlider.value.slideNext(speed.value);

        } else if (transform === 0) {
          sliderGroup.value.swiper.slideNext(speed.value);
        }

      }, time);

    } else if (index < sliderGroup.value.swiper.activeIndex) {
      span.style.transform = `translateX(0%)`;
    }

  });

};

const stopProgress = () => {
  clearInterval(interval.value);
};

const onSlideChange = () => {
  mainSlider.value ? (stopProgress(), setProgress()) : false;
  setActiveIndex();
};

const onTouchStart = () => {
  isPaused.value = true;
};

const onTouchEnd = () => {
  isPaused.value = false;
};

defineExpose({
  closeStory
});

</script>

<style lang="scss" scoped>
.stories-main-slider {
  overflow: visible;
  width: 100%;

  &__item {
    margin: 0 10vw;
    width: 40rem;
    height: 60rem;
    border-radius: 1.6rem;
    transform: scale(0.6);
    transition: transform 0.3s ease;
    position: relative;

    &.swiper-slide-prev,
    &.swiper-slide-next {
      cursor: pointer;
    }

    &.swiper-slide-prev {
      &:hover {
        transform: scale(0.6) translate(20%);
      }
    }
    &.swiper-slide-next {
      &:hover {
        transform: scale(0.6) translate(-20%);
      }
    }

    @include r($md) {
      margin: 0 5vw;
      width: 50rem;
      height: 78rem;
      transform: scale(0.8);
    }

    @include r($sm) {
      margin: 0;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }

    &.swiper-slide-active {
      transform: scale(1);

      :deep(.stories-group-slider__pagination) {
        opacity: 1;
        visibility: visible;
      }

      .stories-main-slider__item-btn {
        opacity: 1;
        visibility: visible;
      }
    }

    &-btn {
      position: absolute;
      top: -5rem;
      right: -5rem;
      
      width: 5rem;
      height: 5rem;

      opacity: 0;
      visibility: hidden;

      display: flex;
      align-items: center;
      justify-content: center;

      :deep(svg) {
        width: 3rem;
        height: 3rem;
        max-width: 100%;
        max-height: 100%;
      }

      @include r($sm) {
        display: none;
      }
    }
  }

  &__nav {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 55rem;
    z-index: 100;

    @include r($md) {
      width: 68rem;
    }

    @include r($sm) {
      width: 100%;
      height: 100%;
    }

    &-prev,
    &-next {
      padding: 0.5rem;
      width: 5rem;
      height: 5rem;
      background-color: #fff;
      border-radius: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;

      transition: background-color 0.3s ease;

      &:hover {
        @include rmin($sm) {
          background-color: #E8E8E8;
        }
      }

      :deep(svg) {
        width: 2.5rem;
        height: 2.5rem;
        max-width: 100%;
        max-height: 100%;
        @include r($sm) {
          display: none;
        }
      }

      @include r($sm) {
        width: 50%;
        height: 100%;
        background: transparent;
      }
    }

    &-prev {
      left: 0;
      transform: rotate(180deg);
    }

    &-next {
      right: 0;
    }
  }

  &__btn {
    display: none;
    
    
    @include r($sm) {
      position: absolute;
      display: flex;
      top: 7.2rem;
      right: 0.7rem;
      width: 8rem;
      height: 8rem;
      z-index: 200;

      :deep(svg) {
        width: 6rem;
        height: 6rem;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>