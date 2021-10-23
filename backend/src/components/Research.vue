<template>
<section class="section">
  <div class="content px-6">
    <p class="title">
      {{ $t('message.research.headline') }}
    </p>
    <p class="subtitle">
      {{ $t('message.research.authors') }}
    </p>
    <article class="has-text-justified is-size-4">
      {{ $t('message.research.body') }}
    </article>
    <div class="column has-text-right">
      <a class="button has-background-dark has-text-white"
         href="https://github.com/ftyers/nis-nplm/blob/master/iiksiin.article/article.pdf">{{ $t('message.research.read') }}</a>
    </div>
  </div>
</section>
</template>

<script>
export default {
name: "Research"
}
</script>

<style scoped>

</style>