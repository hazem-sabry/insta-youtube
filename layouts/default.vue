<template>
  <div>
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
  },
}
</script>
