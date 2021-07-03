<template>
  <nuxt-link class="ChannelCard" :to="`/channel/${channel.id}`">
    <div class="ChannelCard__poster">
      <picture>
        <source
          media="(min-width:768px)"
          :srcset="channel.thumbMedium"
          type="image/png"
        />
        <source
          media="(min-width:480px)"
          :srcset="channel.thumb"
          type="image/png"
        />
        <img :src="channel.thumb" />
      </picture>
    </div>
    <div class="ChannelCard__details">
      <b>{{ channel.title | title }}</b>
      <span>Channel</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ChannelCard',
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.ChannelCard {
  display: flex;
  align-items: center;
  margin: 10px;

  &__poster {
    img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border-radius: 50%;
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
  }
}
</style>
