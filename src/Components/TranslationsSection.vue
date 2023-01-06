
<template>
  <div class="k-translations-section">
    <h2 v-if="label">{{label}}</h2>
    <k-translations
      v-bind="getTranslationsProviderPropsBinding()"
      ref="translations"
    >
      <template v-slot:extrabuttons="translationsData">
          <k-button
            v-if="revertable && !translationsData.actualLanguage.default"
            class="k-translations-button"
            @click.stop="$refs.translations.revertTranslationOpen(translationsData.actualLanguage)"
            :text="'Revert '+ translationsData.actualLanguage.name"
            icon="refresh"
            theme="warning"
          />
          <k-button
            v-if="deletable && !translationsData.actualLanguage.default"
            class="k-translations-button"
            @click.stop="$refs.translations.deleteTranslationOpen(translationsData.actualLanguage)"
            :text="'Delete '+ translationsData.actualLanguage.name"
            icon="trash"
            theme="negative"
          />
      </template>
    </k-translations>


  </div>
</template>

<script>

import TranslationsProvider from "./TranslationsProvider.js";
export const TranslationsProviderSelf = { ...TranslationsProvider };

export default {

  data: function(){
    return {
      // Override defaults
      deletable: true,
      revertable: true,
    };
  },
  mixins: [
    TranslationsProviderSelf,
  ],
  created() {
    // Ensure refreshing data on save
    // this.$events.$on("model.save", this.updateButtons);
    // this.$events.$on("model.update", this.updateButtons);
  },
};
</script>

<style lang="less">
.k-translations-section {
  .k-translations-buttons {
    padding: 1rem 0;
  }
  .k-translations-below {
    padding-bottom: 1rem;
  }
  .k-translations-below .k-button {
    display: block;
    width: 100%;
  }
}
</style>
