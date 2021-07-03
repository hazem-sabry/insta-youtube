<template>
  <div>
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '@/components/TheHeader'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
    }),
  },
  watch: {
    loading(value) {
      if (value) {
        this.$nuxt.$loading.start()
      } else {
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>
