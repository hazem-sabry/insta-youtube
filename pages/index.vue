<template>
  <div class="container">
    <template v-if="items.length || searching">
      <Filters />
    </template>
    <template v-if="!items.length">
      <NoResultsFound />
    </template>
    <Listing :items="items" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InstaYoutube',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      items: 'listing/items',
      searching: 'listing/searching',
    }),
  },
}
</script>
