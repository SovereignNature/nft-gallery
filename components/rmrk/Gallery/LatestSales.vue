<template>
  <div>
    <Loader v-model="isLoading" />

    <div class="columns is-vcentered">
      <div class="column is-four-fifths">
        <h1 class="title is-2">{{ $t('general.latestNfts') }}</h1>
        <p class="subtitle is-size-5">
          {{ $t('general.latestNftsHeading') }}
        </p>
      </div>
    </div>
    <CarouselCardList :nfts="nfts" :page="currentValue" />
    <div class="pt-4 has-text-right">
      <b-button
        tag="nuxt-link"
        type="is-primary"
        inverted
        outlined
        icon-right="chevron-right"
        :to="`/${urlPrefix}/explore?search=&sort=UPDATED_AT_DESC&tab=GALLERY`">
        {{ $t('helper.seeMore') }}
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import latestNfts from '@/queries/rmrk/subsquid/latestNfts.graphql'
import {
  getCloudflareImageLinks,
  getProperImageLink,
} from '~/utils/cachingStrategy'
import PrefixMixin from '~/utils/mixins/prefixMixin'
import AuthMixin from '@/utils/mixins/authMixin'
import { getCollectionIds } from '~/utils/api/filtering'

const components = {
  CarouselCardList: () => import('@/components/base/CarouselCardList.vue'),
  Pagination: () => import('@/components/rmrk/Gallery/Pagination.vue'),
  Loader: () => import('@/components/shared/Loader.vue'),
}

@Component<LatestSales>({
  components,
})
export default class LatestSales extends mixins(PrefixMixin, AuthMixin) {
  // @Prop({ required: false, type: Array, default: () => [] })
  // passionList?: string[]
  private nfts: any[] = []
  private events: any[] = []
  private currentValue = 1
  private total = 0

  get isLoading(): boolean {
    return false
  }

  async fetch() {
    this.fetchData()
  }

  // @Watch('passionList')
  // private onPassionList() {
  //   this.fetchData()
  // }

  displayItemsByScreenSize(): number {
    if (window.innerWidth < 768) {
      return 1
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      return 2
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
      return 3
    } else {
      return 4
    }
  }

  async fetchData() {
    const collectionIds = await getCollectionIds()

    const queryVars = {
      limit: this.displayItemsByScreenSize(),
      collectionIds,
    }
    const result = await this.$apollo
      .query({
        query: latestNfts,
        client: this.client,
        variables: queryVars,
      })
      .catch((e) => {
        this.$consola.error(e)
        return { data: null }
      })

    if (result.data) {
      await this.handleResult(result)
    }
  }

  protected async handleResult({ data }) {
    const { nftEntities } = data

    console.log(nftEntities)

    this.total = nftEntities.length

    const images = await getCloudflareImageLinks(
      nftEntities.map(({ id }) => id)
    )

    const imageOf = getProperImageLink(images)
    this.nfts = nftEntities.map((e: any) => ({
      ...e,
      image: imageOf(e.meta.id, e.meta.image),
    }))
  }
}
</script>
