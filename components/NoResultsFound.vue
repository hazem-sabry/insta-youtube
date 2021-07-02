<template>
  <section class="EmptyPage">
    <svg-icon name="empty-page" class="EmptyPage__icon" />
    <p>Nothing here so far...</p>
  </section>
</template>

<style lang="scss" scoped>
.EmptyPage {
  width: 100%;
  max-width: 28rem;
  margin: 50px auto 0;
  padding-inline: 15px;
  text-align: center;

  &__icon {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }
}
</style>
