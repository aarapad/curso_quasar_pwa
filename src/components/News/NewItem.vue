<template>
  <q-item clickable v-ripple @click="$emit('onForward')">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ singleNew.date }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'NewItemComponent',
  props: {
    singleNew: {
      required: true,
      type: Object
    }
  },
  computed: {
    title () {
      return `${this.singleNew.title.substr(0, 40)}...`
    }
  }
}
</script>