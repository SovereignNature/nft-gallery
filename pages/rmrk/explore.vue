<template>
  <ExploreLayout type="rmrk" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ExploreLayout from '@/components/rmrk/ExploreLayout/ExploreLayout.vue'

const components = {
  ExploreLayout,
}

@Component<ExploreRmrk>({
  components,
  head() {
    const metaData = {
      type: 'profile',
      description: 'Buy Carbonless NFTs on Kusama',
      url: '/rmrk/explore',
      image: `${this.$config.baseUrl}/k_card_collections.png`,
    }
    return {
      meta: [...this.$seoMeta(metaData)],
    }
  },
})
export default class ExploreRmrk extends Vue {}
</script>
