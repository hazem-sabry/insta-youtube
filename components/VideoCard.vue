<template>
  <nuxt-link class="VideoCard" :to="`/watch/${video.id}`">
    <div class="VideoCard__poster">
      <picture>
        <source
          media="(min-width:768px)"
          :srcset="video.thumbMedium"
          type="image/png"
        />
        <source
          media="(min-width:480px)"
          :srcset="video.thumb"
          type="image/png"
        />
        <img :src="video.thumb" />
      </picture>
    </div>
    <div class="VideoCard__details">
      <b>{{ video.title | title }}</b>
      <nuxt-link :to="`/channel/${video.channel.id}`">
        {{ video.channel.title }}
        <time>{{ video.pubdate | timeDistance }}</time>
      </nuxt-link>
      <p>{{ video.desc }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'VideoCard',
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.VideoCard {
  display: flex;
  margin: 10px;

  &__poster {
    img {
      width: 160px;
      height: 90px;
      object-fit: cover;

      @media (min-width: 768px) {
        width: 320px;
        height: 180px;
      }
    }
  }

  &__details {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;

    b {
      font-size: 1rem;
      margin-bottom: 10px;
    }

    a {
      margin-bottom: 10px;
      time {
        color: #aaa;
        display: block;
        margin-top: 5px;
        white-space: nowrap;
        @media (min-width: 768px) {
          display: inline;
        }

        &::before {
          content: '•';
          color: #000;
          margin: 0 4px;
          display: none;
          @media (min-width: 768px) {
            display: inline;
          }
        }
      }
    }

    p {
      color: #444;
      display: none;
      @media (min-width: 768px) {
        display: block;
      }
    }
  }
}
</style>
