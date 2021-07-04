<template>
  <section class="Playlist">
    <div class="container">
      <template v-for="item in playlistVideos">
        <VideoCard :key="item.id" :video="item" />
      </template>
    </div>
  </section>
</template>

<script>
import { GET_PLAYLIST } from '@/api/endpoints'
import { mapPlaylistItem } from '@/utils/maps'

export default {
  name: 'PlaylistDetails',
  data() {
    return {
      playlistVideos: null,
    }
  },
  async fetch() {
    const playlistId = this.$route.params.id

    const { items } = await this.$api(GET_PLAYLIST, {
      playlistId,
      maxResults: 50,
    })

    this.playlistVideos = items.map(mapPlaylistItem)
  },
}
</script>

<style lang="scss" scoped>
.Playlist {
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
