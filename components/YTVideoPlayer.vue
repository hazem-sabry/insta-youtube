<template>
  <div class="YTVideoPlayer">
    <iframe
      class="YTVideoPlayer__iframe"
      :src="`https://www.youtube.com/embed/${id}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'YTVideoPlayer',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.YTVideoPlayer {
  position: relative;
  width: 100vw;
  height: 56.25vw; /* 100*9/16 */
  margin-inline: auto;
  max-width: 850px;
  max-height: 478.125px; /* 850*9/16 */

  &__iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
