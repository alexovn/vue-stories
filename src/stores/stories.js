import { defineStore } from 'pinia';

export const useStoriesStore = defineStore('stories', {
  state: () => {
    return {
      stories: [
        {
          id: 1,
          title: '#FF8787',
          img: '',
          bg: '#FF8787',
          storiesGroup: [
            {
              title: '#FF8787',
              text: '',
              img: '',
              bg: '##FF8787'
            },
            {
              title: '#E5EBB2',
              text: '',
              img: '',
              bg: '#E5EBB2'
            },
            {
              title: '#BCE29E',
              text: '',
              img: '',
              bg: '#BCE29E'
            }
          ]
        },
        {
          id: 2,
          title: '#B1B2FF',
          img: '',
          bg: '#B1B2FF',
          storiesGroup: [
            {
              title: '#B1B2FF',
              text: '',
              img: '',
              bg: '#B1B2FF'
            },
            {
              title: '#D2DAFF',
              text: '',
              img: '',
              bg: '#D2DAFF'
            },
            {
              title: '#EEF1FF',
              text: '',
              img: '',
              bg: '#EEF1FF'
            }
          ]
        },
        {
          id: 3,
          title: '#B7C4CF',
          img: '',
          bg: '#B7C4CF',
          storiesGroup: [
            {
              title: '#B7C4CF',
              text: '',
              img: '',
              bg: '#B7C4CF'
            },
            {
              title: '#D7C0AE',
              text: '',
              img: '',
              bg: '#D7C0AE'
            },
            {
              title: '#967E76',
              text: '',
              img: '',
              bg: '#967E76'
            }
          ]
        },
        {
          id: 4,
          title: '#FFB3B3',
          img: '',
          bg: '#FFB3B3',
          storiesGroup: [
            {
              title: '#FFB3B3',
              text: '',
              img: '',
              bg: '#FFB3B3'
            },
            {
              title: '#FFE9AE',
              text: '',
              img: '',
              bg: '#FFE9AE'
            },
            {
              title: '#C1EFFF',
              text: '',
              img: '',
              bg: '#C1EFFF'
            }
          ]
        },
        {
          id: 5,
          title: '#C4DFAA',
          img: '',
          bg: '#C4DFAA',
          storiesGroup: [
            {
              title: '#C4DFAA',
              text: '',
              img: '',
              bg: '#C4DFAA'
            },
            {
              title: '#90C8AC',
              text: '',
              img: '',
              bg: '#90C8AC'
            },
            {
              title: '#73A9AD',
              text: '',
              img: '',
              bg: '#73A9AD'
            }
          ]
        },
        {
          id: 6,
          title: '#F2D7D9',
          img: '',
          bg: '#F2D7D9',
          storiesGroup: [
            {
              title: '#F2D7D9',
              text: '',
              img: '',
              bg: '#F2D7D9'
            },
            {
              title: '#9CB4CC',
              text: '',
              img: '',
              bg: '#9CB4CC'
            },
            {
              title: '#748DA6',
              text: '',
              img: '',
              bg: '#748DA6'
            }
          ]
        },
        {
          id: 7,
          title: '#9ADCFF',
          img: '',
          bg: '#9ADCFF',
          storiesGroup: [
            {
              title: '#9ADCFF',
              text: '',
              img: '',
              bg: '#9ADCFF'
            },
            {
              title: '#FFB2A6',
              text: '',
              img: '',
              bg: '#FFB2A6'
            },
            {
              title: '#FF8AAE',
              text: '',
              img: '',
              bg: '#FF8AAE'
            }
          ]
        },
      ],
      storyIndex: null,
      isStoriesActive: false,
    }
  },

  actions: {
    showStory(boolean) {
      this.isStoriesActive = boolean;
    }
  }

})