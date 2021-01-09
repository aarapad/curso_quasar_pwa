<template>
  <q-card class="my-card" flat bordered>
      <q-img
        :src="singleNew.image"
      />
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ singleNew.title }}</div>
        <div class="text-subtitle2">{{ singleNew.date }} {{ singleNew.time }}</div>
        <div class="text-caption text-grey">
          {{ singleNew.description }}
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn round color="primary" icon="arrow_back" @click="$router.back()" />
      </q-card-actions>  
  </q-card>
</template>

<script>
export default {
  name: 'NewDetailComponent',
  props: {
    singleNew: {
      type: Object,
      required: true
    }
  }
}
</script>