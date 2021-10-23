<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <div class="p has-text-left my-2 is-size-5">
          {{$t('message.try.instructions')}}
        </div>
        <div :class="{control: true, 'is-loading': isLoading}">
          <textarea class="textarea" :placeholder="$t('message.try.placeholder')" v-model="text"></textarea>
        </div>
        <div class="column my-2 has-text-left">
          <transition name="slide-fade">
            <div v-show="!isLoading && text">
              <button
                  @click="loadSuggestions"
                  class="button has-background-info-light has-text-black-bis is-rounded mx-2"
                  :class="{'is-loading': isLoading}">{{ $t('message.try.getSuggestions') }}
              </button>
              <button
                  @click="text += suggestion"
                  class="button has-background-info has-text-white is-rounded"
                  v-for="(suggestion, i) in suggestions"
                  :key="i">{{ suggestion }}
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchSuggestions } from "@/api"

export default {
  name: "Try",
  data: function () {
    return {
      text: "",
      isLoading: false,
      isError: false,
      suggestions: []
    }
  },
  methods: {
    loadSuggestions: async function () {
      try {
        this.isLoading = true;
        const {data} = await fetchSuggestions(this.text);
        this.suggestions = data.suggestions
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}
</style>