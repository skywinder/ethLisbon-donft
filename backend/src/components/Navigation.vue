<template>
  <nav class="level">
    <p class="level-item has-text-centered">
      <router-link :to="{name: 'Home'}" class="link is-info">{{ $t('message.nav.home') }}</router-link>
    </p>
    <p class="level-item has-text-centered">
      <router-link :to="{name: 'Try'}" class="link is-info">{{ $t('message.nav.try') }}</router-link>
    </p>
    <h1 class="level-item has-text-centered title">
      ChukchiType
    </h1>
    <p class="level-item has-text-centered">
      <a class="link is-info" href="https://github.com/ftyers/nis-nplm">{{ $t('message.nav.repo') }}</a>
    </p>
      <div class="level-item has-text-centered">

        <div class="select"><select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
            {{ lang }}
          </option>
        </select></div>
      </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data () {
    return {
      langs: ['ru', 'en']
    }
  }
}
</script>

<style scoped>

</style>