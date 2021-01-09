<template>
  <div
    v-if="!isOnline"
    class="bg-red-13 text-white row flex-center">
    {{ $t('working_offline') }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WorkingOfflineComponent',
  computed: {
    ...mapState('app', ['isOnline'])
  }
}
</script>
