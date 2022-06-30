<template>
  <section class="homepage section">
    <div class="container">
      <div class="columns">
        <div class="column is-three-fifths">
          <h3
            class="is-1 is-size-3-mobile is-flex is-flex-direction-column uppercase homepage__heading">
            <span class="homepage__title my-5">
              {{ $t('general.bioCompendium') }}
            </span>
            <span class="homepage__subtitle">
              {{ $t('general.nftGalleryPlanting') }}
            </span>
            <span class="homepage__subtitle text">
              {{ $t('general.bioCompendiumText') }}
            </span>
          </h3>
        </div>
      </div>
      <div v-if="prefix === 'rmrk'">
        <LazyGalleryLatestSales :passionList="passionList" class="my-5" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import passionQuery from '@/queries/rmrk/subsquid/passionFeed.graphql'
import AuthMixin from '@/utils/mixins/authMixin'

@Component<Landing>({})
export default class Landing extends mixins(AuthMixin) {
  @Prop({ type: String, required: true, default: 'rmrk' }) prefix!: string
  @Prop({ type: String, default: 'RMRK Protocol' }) buildOn!: string

  private passionList: string[] = ['']

  async created() {
    if (this.isLogIn) {
      const result = await this.fetchPassionList()
      if (result.length) {
        this.passionList = this.passionList.concat(result)
      }
    }
  }

  public async fetchPassionList() {
    const {
      data: { passionFeed },
    } = await this.$apollo.query({
      query: passionQuery,
      client: 'subsquid',
      variables: {
        account: this.accountId,
      },
    })
    return passionFeed?.map((item) => item.id) || []
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

@include mobile {
  .homepage.section {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.homepage {
  content: '';
  width: 100%;
  color: $text;

  &__title {
    text-transform: uppercase;
    font-weight: 600;
    color: $primary;
  }

  &__heading {
    font-size: 4rem;
    color: $text;
  }

  &__subtitle {
    line-height: 1.75rem;
    font-size: 2rem;
    text-transform: none;
    &.text {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      font-size: 1.25rem;
    }
  }
}
.title {
  word-break: normal;
  font-family: $family-jost;
}
.subtitle {
  text-decoration: underline;
}

.truncate {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

li {
  list-style-type: square;
}
//TODO: Fix their footer for be on bottom in the landing page
.footer {
  position: absolute;
  bottom: 0;
}
</style>
