<template>
  <div>
    <section class="hero is-link is-halfheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="column">
            <p class="title has-text-left">
              {{ $t('message.home.headline') }}
            </p>
            <i18n path="message.home.heroText" tag="p" class="has-text-left is-size-6">
              <a :href="$t('message.home.link')" class="has-text-weight-bold is-link">{{ $t('message.home.compLing') }}</a>
            </i18n>
          </div>
          <router-link :to="{name: 'Research'}" class="is-pulled-right is-dark button">{{ $t('message.home.learnMore') }}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Base"
}
</script>

<style scoped>

</style>