<template>
  <section class="Listing">
    <div class="Listing__wrapper">
      <template v-for="item in items">
        <VideoCard
          v-if="item && item.type === 'video'"
          :key="item.id"
          :video="item"
        />
        <ChannelCard
          v-else-if="item && item.type === 'channel'"
          :key="item.id"
          :channel="item"
        />
        <PlaylistCard
          v-else-if="item && item.type === 'playlist'"
          :key="item.id"
          :playlist="item"
        />
      </template>
      <button
        v-if="items.length && nextPageToken && enableLoadMore"
        class="Listing__more"
        @click="loadMore"
      >
        <Spinner v-if="loadingMore" class="w-sm h-sm" />
        <span v-else>Load More</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Listing',
  props: {
    items: {
      type: Array,
      required: true,
    },
    enableLoadMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loadingMore: false,
    }
  },
  computed: {
    ...mapGetters({
      nextPageToken: 'filters/nextPageToken',
    }),
  },
  methods: {
    async loadMore() {
      try {
        this.loadingMore = true
        await this.$store.dispatch('LOAD_MORE')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        this.loadingMore = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.Listing {
  position: relative;

  &__more {
    margin-top: 25px;
    width: 100%;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    background-color: transparent;
    border: 0;
    border-top: 1px solid #ddd;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 1rem;
  }
}
</style>
