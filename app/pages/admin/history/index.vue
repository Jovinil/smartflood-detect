
<template>
<div class="flex flex-col h-screen px-5 py-6">
  <!-- Fixed Header -->
  <header class="h-8 flex items-center justify-between px-2">
    <UButton  
            icon="i-lucide-arrow-left" 
            size="xl"
            variant="solid"
            to="/"
        />
    <div>
        <!-- <UInput icon="i-lucide-search" size="md" v-model="globalFilter" variant="outline" placeholder="Search..." /> -->
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col flex-1 min-h-0">
    <!-- Scrollable -->
    <div class="flex-1 overflow-y-auto min-h-0">
      
    </div>

    <!-- Fixed Pagination at Bottom -->
    <div class="shrink-0 border-t border-gray-600 py-2 flex justify-center items-center">
         
  <UPagination v-model:page="page" active-color="primary" active-variant="subtle" :total="100" />
    </div>
  </main>
</div>


</template>

<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})

const page = ref(5);
</script>
