<template>
  <section class="homepage section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h3
            class="title is-1 is-size-3-mobile is-flex is-flex-direction-column uppercase homepage__heading">
            <span class="text__stroked my-5">
              {{ $t('general.bioCompendium') }}
            </span>
            <span class="homepage__subtitle">
              {{ $t('general.nftGalleryPlanting') }}
            </span>
            <span class="homepage__subtitle text">
              {{ $t('general.bioCompendiumText') }}
            </span>
            <span class="homepage__subtitle text">
              {{ $t('helper.builtOn') }}
              <span class="text-bold text-primary"> {{ buildOn }} </span>
            </span>
          </h3>
          <a
            href="https://discord.gg/35hzy2dXXh"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="https://badgen.net/discord/online-members/35hzy2dXXh"
              alt="Discord"
              width="354"
              height="40"
              style="width: 177px" />
          </a>
        </div>
        <div class="column">
          <LazyGalleryCuratedList v-if="prefix === 'rmrk'" />
        </div>
      </div>
      <div v-if="prefix === 'rmrk'">
        <LazyGalleryLatestSales :passionList="passionList" class="my-5" />
        <LazyGalleryPopularCollections class="my-5" />
        <LazyGalleryNewestList :passionList="passionList" class="my-5" />
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
  }
}

.homepage {
  content: '';
  width: 100%;
  height: 100%;
  color: $text;

  &__title {
    display: inline-flex;
    padding: 16px 32px;
    margin: 0 0 60px;
    text-transform: uppercase;
    border: 4px solid $primary;
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
  font-family: $family-playfair-display;
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
</style>
