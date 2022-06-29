<template>
  <CreativeMint />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CreativeMint from '@/components/rmrk/Create/CreativeMint.vue'

@Component({
  components: {
    CreativeMint,
  },
  head() {
    const metaData = {
      type: 'article',
      description: 'Create carbonless NFTs with low on-chain fees',
      url: '/rmrk/creative',
      image: `${this.$config.baseUrl}/k_card_mint.png`,
    }
    return {
      meta: [...this.$seoMeta(metaData)],
    }
  },
})
export default class CreativeMintPage extends Vue {
  layout() {
    return 'centered-half-layout'
  }
}
</script>
