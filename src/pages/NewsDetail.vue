<template>
  <q-page padding>
    <new-detail :single-new="$store.state.news.singleNew" />
  </q-page>
</template>

<script>
import NewDetail from '../components/News/NewDetail'
export default {
  name: 'NewsDetailPage',
  components: {
    NewDetail
  }
}
</script>

<style>
</style>
