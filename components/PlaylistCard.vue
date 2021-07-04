<template>
  <nuxt-link class="PlaylistCard" :to="`/playlist/${playlist.id}`">
    <div class="PlaylistCard__poster">
      <div class="PlaylistCard__overlay">
        <svg-icon name="playlist" class="w-md h-md" />
      </div>
      <picture>
        <source
          media="(min-width:768px)"
          :srcset="playlist.thumbMedium"
          type="image/png"
        />
        <source
          media="(min-width:480px)"
          :srcset="playlist.thumb"
          type="image/png"
        />
        <img :src="playlist.thumb" />
      </picture>
    </div>
    <div class="PlaylistCard__details">
      <b>{{ playlist.title | title }}</b>
      <nuxt-link :to="`/channel/${playlist.channel.id}`">
        {{ playlist.channel.title }}
        <time>{{ playlist.pubdate | timeDistance }}</time>
      </nuxt-link>
      <p>{{ playlist.desc }}</p>
      <nuxt-link :to="`/playlist/${playlist.channel.id}`">
        <span>view full playlist</span>
      </nuxt-link>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PlaylistCard',
  props: {
    playlist: {
      type: Object,
      default: () => {
        return {
          id: 'Ommz8QGztak',
          channel: {
            id: 'UCZTLU39XbfN04FBXVc0vD1g',
            title: 'Nickelodeon Arabia',
          },
          title: 'SpongeBob | Nickelodeon Arabia | سبونج بوب | حب الجيران',
          desc: 'ومن الذين لا يحبون جيرانهم؟ اشترك الآن لمشاهدة أفضل الأحداث والمغامرات المسلية من عروضكم المفضلة مثل سبونج بوب سكوير بانتس وهنري البطل و ثاندرمان ومنزل لاود، ...',
          thumb: 'https://i.ytimg.com/vi/Ommz8QGztak/default.jpg',
          thumbMedium: 'https://i.ytimg.com/vi/Ommz8QGztak/mqdefault.jpg',
          pubdate: '2020-01-16T14:00:02.000Z',
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.PlaylistCard {
  display: flex;
  margin: 10px;

  &__poster {
    position: relative;
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

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.75);
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

    span {
      display: inline-block;
      text-transform: uppercase;
      margin-top: 10px;
    }
  }
}
</style>
