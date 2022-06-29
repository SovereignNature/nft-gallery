<template>
  <div class="columns">
    <div class="column is-four-fifths">
      <h1 class="title is-2">{{ title }}</h1>
      <p class="subtitle is-size-5">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class StatsHeader extends Vue {
  @Prop({ type: String }) public title!: ''
  @Prop({ type: String }) public subtitle!: ''
}
</script>
