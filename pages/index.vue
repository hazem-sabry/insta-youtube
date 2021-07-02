<template>
  <div class="container">
    <template v-if="!items.length">
      <NoResultsFound />
    </template>
    <template v-else>
      <Filters />
    </template>
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
    }),
  },
}
</script>
