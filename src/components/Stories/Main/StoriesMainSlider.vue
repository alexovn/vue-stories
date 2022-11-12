<template>
  <swiper class="stories-main-slider" :slides-per-view="swiperOptions.slidesPerView"
    :centeredSlides="swiperOptions.centeredSlides" :initialSlide="swiperOptions.initialSlide" @swiper="setMainSlider"
    @slideChange="onSlideChange">

    <swiper-slide class="stories-main-slider__item" v-for="(story, i) in stories.stories" :key="i"
      :style="{ backgroundColor: story.bg }" @click="slideTo(i)">

      <StoriesGroupSlider :mainStory="story" @swiper="setGroupSlider" @slideChange="onSlideChange" />

      <button class="close-btn stories-main-slider__item-btn" @click="closeStory">
        <IconClose />
      </button>

    </swiper-slide>

    <div class="stories-main-slider__nav">
      <button v-show="isPrevBtnHidden" class="stories-main-slider__nav-prev" @click="slidePrev()">
        Prev
      </button>
      <button v-show="isNextBtnHidden" class="stories-main-slider__nav-next" @click="slideNext()">
        Next
      </button>

    </div>

    <button class="close-btn stories-main-slider__btn" @click="closeStory">
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
import 'swiper/css';

const speed = 500;

const stories = useStoriesStore();
const mainSlider = ref(null);
const groupSlider = ref(null);
const autoplayDelay = 5000;
let interval = null;

const activeSlide = computed(() => {
  return mainSlider.value.slides[mainSlider.value.activeIndex];
});

const sliderGroup = computed(() => {
  return activeSlide.value.querySelector('.stories-group-slider');
});

const setMainSlider = (swiper) => {
  mainSlider.value = swiper;
  // setProgress();
};

const setGroupSlider = (swiper) => {
  groupSlider.value = swiper;
};

const swiperOptions = ref({
  slidesPerView: 'auto',
  centeredSlides: true,
  initialSlide: stories.storyIndex,
});

const closeStory = () => {
  stopProgress();
  stories.isStoriesActive = false;
  stories.storyIndex = null;
};

const slideNext = () => {
  if (!sliderGroup.value.swiper.isEnd) {
    sliderGroup.value.swiper.slideNext(speed);
    return;
  }
  mainSlider.value.slideNext();
};

const slidePrev = () => {
  if (!sliderGroup.value.swiper.isBeginning) {
    sliderGroup.value.swiper.slidePrev(speed);
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
  mainSlider.value.slideTo(i, speed);
};

const setProgress = () => {
  const bullets = sliderGroup.value.querySelectorAll('.swiper-pagination-bullet');
  const time = autoplayDelay / 100;

  bullets.forEach((bullet, index) => {
    const span = bullet.querySelector('span');
    span.style.transform = 'translateX(-100%)';

    if (index === sliderGroup.value.swiper.activeIndex) {
      let transform = -100;

      interval = setInterval(() => {
        if (transform < 0) {
          transform += 1;
        }
        span.style.transform = `translateX(${transform}%)`;

        if (sliderGroup.value.swiper.isEnd && transform === 0) {
          stopProgress();

          const isNext = mainSlider.value.slideNext();

          if (!isNext) {
            closeStory();
          }

          mainSlider.value.slideNext(speed);

        } else if (transform === 0) {
          sliderGroup.value.swiper.slideNext(speed);
        }

      }, time);

    } else if (index < sliderGroup.value.swiper.activeIndex) {
      span.style.transform = `translateX(0%)`;
    }

  });

};

const stopProgress = () => {
  clearInterval(interval);
};

const onSlideChange = () => {
  if (mainSlider.value) {
    stopProgress();
    setProgress();
  }
}

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

    @include r($md) {
      margin: 0 5vw;
      width: 32rem;
      height: 52rem;
      transform: scale(0.8);
    }

    @include r($sm) {
      margin: 0;
      width: 100vw;
      height: 100vh;
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
      top: -1.5rem;
      right: -1.5rem;
      
      width: 1.5rem;
      height: 1.5rem;

      opacity: 0;
      visibility: hidden;

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
    width: 35rem;
    z-index: 100;

    @include r($md) {
      width: 43rem;
    }

    @include r($sm) {
      width: 100%;
      height: 100%;
    }

    &-prev,
    &-next {
      padding: 0.5rem;
      position: absolute;
      background: transparent;

      @include r($sm) {
        width: 50%;
        height: 100%;
      }
    }

    &-prev {
      left: 0;
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
      top: 4.2rem;
      right: 1.7rem;
      width: 2.2rem;
      height: 2.2rem;
      z-index: 200;
    }
  }
}
</style>