<template>
  <div class="min-h-full is-flex is-flex-direction-column">
    <Navbar />
    <main class="is-flex-grow-1">
      <section class="section">
        <div class="container">
          <Error
            v-if="$nuxt.isOffline"
            :hasImg="false"
            errorTitle="Offline Detected"
            errorSubtitle="Please check your network connections" />
          <Nuxt v-else />
        </div>
      </section>
    </main>
    <LazyFooter />
  </div>
</template>
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-NN94K876XV"></script>
<script>
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}
gtag('js', new Date())
gtag('config', 'G-NN94K876XV')
</script>
