<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-12 bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-white relative">
     <div class="absolute inset-0 m-auto w-80 h-80 bg-gradient-to-tr from-blue-700 dark:from-primary via-blue-700 dark:via-primary to-primary dark:to-primary rounded-full opacity blur-3xl z-0"></div>
    <UCard 
      variant="subtle"
      :ui="{ root: 'w-1/1 md:w-1/2 lg:w-1/3 h-80 flex flex-col items-center justify-center shadow-md shadow-gray-800/10 relative z-10', body: 'flex flex-1 flex-col bg-gray-100 shadow-xl dark:bg-gray-900 rounded-xl w-1/1 items-center justify-center p-0 relative z-10' }">
      
      <div class="w-1/1 px-15 md:px-10 lg:px-20">

       <slot/>
      

      </div>
      
    </UCard>
  </div>
</template>