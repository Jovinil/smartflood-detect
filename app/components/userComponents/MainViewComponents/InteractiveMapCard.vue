<template>
 
  <UCard variant="subtle" :ui="{ root: 'flex flex-col shadow-xl mb-5', body: 'flex-1 flex', footer: 'text-end  py-2' }" >
    <template #header>
      Interactive Map
    </template>
    <div class="flex-1 flex">
      <Mapbox />
    </div>
   
    <template #footer>
      <UButton as="NuxtLink" to="/userInteractiveMap" color="neutral" variant="outline" >View</UButton>
    </template>
  </UCard>

</template>

<script>

import { useRouter } from 'vue-router';

</script>
