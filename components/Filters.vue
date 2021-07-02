<template>
  <section class="Filters">
    <div class="Filters__selects">
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
    </div>
  </section>
</template>

<script>
export default {
  name: 'Filters',
  data() {
    return {
      type: null,
      time: null,
    }
  },
  computed: {
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
  },
}
</script>

<style lang="scss" scoped>
.Filters {
  position: relative;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;

  &__select {
    font-size: 1rem;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ddd;
    background-color: #f8f8f8;
  }
}
</style>
