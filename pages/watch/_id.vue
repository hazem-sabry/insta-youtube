<template>
  <section v-if="video" class="Video">
    <YTVideoPlayer :id="$route.params.id" />
    <div class="container">
      <div class="Video__details">
        <h3>{{ video.title }}</h3>
        <div class="Video__stats">
          <p>{{ video.views }} Views</p>
          <div class="Video__interactions">
            <button>
              <svg-icon name="like" class="w-sm h-sm" />
              <span>{{ video.likes }}</span>
            </button>
            <button>
              <svg-icon name="dislike" class="w-sm h-sm" />
              <span>{{ video.dislikes }}</span>
            </button>
            <button>
              <svg-icon name="comments" class="w-sm h-sm" />
              <span>{{ video.comments }}</span>
            </button>
          </div>
        </div>
      </div>
      <Listing :items="videos" :enable-load-more="false" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_VIDEO } from '@/api/endpoints'
import { mapVideo } from '@/utils/maps'

export default {
  name: 'VideoDetails',
  data() {
    return {
      video: null,
    }
  },
  async fetch() {
    const { id } = this.$route.params

    try {
      const data = await this.$api(GET_VIDEO, {
        id,
      })

      this.video = data.items.map(mapVideo)[0]

      await this.$store.dispatch('GET_RELATED_VIDEOS', this.video.id)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },
  computed: {
    ...mapGetters({
      videos: 'listing/videos',
    }),
  },
}
</script>

<style lang="scss" scoped>
.Video {
  position: relative;

  &__details {
    margin-top: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    p {
      white-space: nowrap;
    }
  }

  &__stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }

  &__interactions {
    display: flex;
    justify-content: space-around;
    flex-grow: 1;
    max-width: 500px;
    button {
      background-color: transparent;
      padding: 10px 15px;
      border: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      span {
        padding-left: 10px;
        font-size: 1rem;
      }
    }
  }
}
</style>
