
<template>
  <UCard  variant="subtle" 
  :ui="
  { 
    root: 'flex flex-col h-auto md:flex-3 shadow-xl bg-gray-100 dark:bg-gray-950 relative md:rounded-none', 
    body: 'h-full w-full p-0 md:flex-1 flex sm:p-0',
  }">

    <div class="h-80 w-full md:flex-1 md:h-full flex relative sm:p-0">
      <div class="absolute top-2 left-2 md:top-4 md:left-4 z-10">
        <UButton  
          icon="i-lucide-arrow-left" 
          size="xl"
          variant="solid"
          to="/"
        />
      </div>
      <div ref="geocoderContainer" class="absolute top-2 right-2 md:px-4 md:py-4 md:right-2 w-2/3 md:w-120  z-10"></div>

      <Mapbox />
    </div>

  </UCard>

</template>
