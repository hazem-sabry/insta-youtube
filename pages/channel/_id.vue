<template>
  <section v-if="channel" class="Channel">
    <div class="Channel__header">
      <img :src="channel.cover" :alt="channel.name" />
    </div>
    <div class="container">
      <div class="Channel__info">
        <img class="Channel__image" :src="channel.thumb" :alt="channel.name" />
        <h3>{{ channel.name }}</h3>
        <button class="Channel__subscribe">
          <svg-icon name="logo" class="w-sm h-sm" />
          <span>subscribe</span>
          <small>{{ channel.statistics.subscribers }}</small>
        </button>
      </div>
      <Listing :items="videos" :enable-load-more="false" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_CHANNEL } from '@/api/endpoints'
import { mapChannelDetails } from '@/utils/maps'

export default {
  name: 'ChannelDetails',
  data() {
    return {
      channel: null,
    }
  },
  async fetch() {
    const { id } = this.$route.params

    const { items } = await this.$api(GET_CHANNEL, { id })

    this.channel = items.map(mapChannelDetails)[0]

    this.$store.dispatch('GET_CHANNEL_VIDEOS', this.channel.id)
  },
  computed: {
    ...mapGetters({
      videos: 'listing/channelVideos',
    }),
  },
}
</script>

<style lang="scss" scoped>
.Channel {
  position: relative;
  &__header {
    width: 100vw;
    height: 100px;

    @media (min-width: 768px) {
      height: 200px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    position: relative;
    margin-top: 55px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }

  &__image {
    position: absolute;
    left: 0;
    top: -100px;
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__subscribe {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    margin-top: 10px;
    color: $base-color;
    display: flex;
    align-items: center;

    span {
      text-transform: uppercase;
      padding-left: 7px;
    }

    small {
      padding-left: 10px;
      color: #777;
    }
  }
}
</style>
