<template>
  <section class="Filters">
    <div class="Filters__wrapper">
      <div class="Filters__header">
        <span>About {{ total }} results</span>
        <button class="Filters__toggle" @click="toggleFilters = !toggleFilters">
          <svg-icon name="filters" class="w-sm h-sm" />
          <span>filter</span>
        </button>
      </div>
      <template v-if="!desktop && toggleFilters">
        <select id="type" v-model="type" class="Filters__select" name="type">
          <option value="null">All</option>
          <option value="video">Video</option>
          <option value="channel">Channel</option>
          <option value="playlist">Playlist</option>
        </select>
        <select id="time" v-model="time" class="Filters__select" name="time">
          <option value="null">Any Time</option>
          <option :value="today">Today</option>
          <option :value="thisWeek">This Week</option>
          <option :value="thisMonth">This Month</option>
          <option :value="thisYear">This Year</option>
        </select>
      </template>
      <div v-else-if="desktop && toggleFilters" class="Filters__controls">
        <div class="Filters__column">
          <h4>upload date</h4>
          <button
            v-for="(item, idx) in dates"
            :key="idx"
            class="Filters__control"
            :class="{
              'Filters__control--selected': selected('time', 'dates', idx),
            }"
            @click="time = item.value"
          >
            <span>{{ item.name }}</span>
            <span
              v-if="selected('time', 'dates', idx)"
              class="Filters__control__remove"
              @click.stop="time = null"
            >
              &times;
            </span>
          </button>
        </div>
        <div class="Filters__column">
          <h4>type</h4>
          <button
            v-for="(item, idx) in types"
            :key="idx"
            class="Filters__control"
            :class="{
              'Filters__control--selected': selected('type', 'types', idx),
            }"
            @click="type = item.value"
          >
            <span>{{ item.name }}</span>
            <span
              v-if="selected('type', 'types', idx)"
              class="Filters__control__remove"
              @click.stop="type = null"
            >
              &times;
            </span>
          </button>
        </div>
        <div class="Filters__column">
          <h4>sort by</h4>
          <button
            v-for="(item, idx) in orders"
            :key="idx"
            class="Filters__control"
            :class="{
              'Filters__control--selected': selected('order', 'orders', idx),
            }"
            @click="order = item.value"
          >
            <span>{{ item.name }}</span>
            <span
              v-if="selected('order', 'orders', idx) && idx !== 0"
              class="Filters__control__remove"
              @click.stop="order = 'relevance'"
            >
              &times;
            </span>
          </button>
        </div>
      </div>
    </div>
    <Spinner v-if="loading" class="w-md h-md" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from './Spinner.vue'

export default {
  name: 'Filters',
  components: { Spinner },
  data() {
    return {
      type: null,
      time: null,
      order: 'relevance',
      desktop: false,
      toggleFilters: false,
    }
  },
  computed: {
    ...mapGetters({
      total: 'listing/total',
      loading: 'loading',
    }),
    today() {
      const start = new Date()
      start.setUTCHours(0, 0, 0, 0)

      return start.toISOString()
    },
    thisWeek() {
      const date = new Date()
      const day = date.getDay()
      const diff = date.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
      return new Date(date.setDate(diff)).toISOString()
    },
    thisMonth() {
      const date = new Date()
      return new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
    },
    thisYear() {
      const date = new Date()
      return new Date(date.getFullYear(), 0, 1).toISOString()
    },
    dates() {
      return [
        {
          name: 'Last Hour',
          value: this.today,
        },
        {
          name: 'This Week',
          value: this.thisWeek,
        },
        {
          name: 'This Month',
          value: this.thisMonth,
        },
        {
          name: 'This Year',
          value: this.thisYear,
        },
      ]
    },
    types() {
      return [
        {
          name: 'Video',
          value: 'video',
        },
        {
          name: 'Channel',
          value: 'channel',
        },
        {
          name: 'PlayList',
          value: 'playlist',
        },
      ]
    },
    orders() {
      return [
        {
          name: 'Relevance',
          value: 'relevance',
        },
        {
          name: 'Upload Date',
          value: 'date',
        },
        {
          name: 'View Count',
          value: 'videoCount',
        },
        {
          name: 'Rating',
          value: 'rating',
        },
      ]
    },
  },
  watch: {
    type(value) {
      if (value == null) this.$store.commit('filters/SET_TYPE', null)
      else this.$store.commit('filters/SET_TYPE', value)

      this.$store.dispatch('GET_ITEMS')
    },
    time(value) {
      if (value == null) this.$store.commit('filters/SET_UPLOADED_DATE', null)
      else this.$store.commit('filters/SET_UPLOADED_DATE', value)

      this.$store.dispatch('GET_ITEMS')
    },
    order(value) {
      this.$store.commit('filters/SET_ORDER', value)

      this.$store.dispatch('GET_ITEMS')
    },
  },
  mounted() {
    this.desktop = window.innerWidth >= 768
    window.onresize = () => {
      this.desktop = window.innerWidth >= 768
    }
  },
  methods: {
    selected(target, key, index) {
      const value = this[key][index].value
      const filter = this[target]

      return filter === value
    },
  },
}
</script>

<style lang="scss" scoped>
.Filters {
  position: relative;

  &__wrapper {
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__toggle {
    background-color: transparent;
    border: 0;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;

    span {
      text-transform: uppercase;
      padding-left: 10px;
      font-size: 1rem;
    }
  }

  &__select {
    margin-top: 10px;
    font-size: 1rem;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ddd;
    background-color: #f8f8f8;
  }

  &__controls {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 20px;

    h4 {
      text-transform: uppercase;
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
  }

  &__column {
    h4 {
      margin-bottom: 10px;
    }
  }

  &__control {
    display: block;
    background-color: transparent;
    border: 0;
    padding: 10px;
    cursor: pointer;
    color: #aaa;
    font-size: 1rem;

    &__remove {
      padding: 4px;
      font-weight: 400;
    }

    &--selected {
      font-weight: 500;
      color: #000;
    }
  }
}
</style>
