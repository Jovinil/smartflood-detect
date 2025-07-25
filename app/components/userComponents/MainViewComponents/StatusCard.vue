<template>
   <UCard class="w-full" variant="subtle" :ui="{  root: 'flex flex-col', header: '', body: 'flex-1' }">
      <template #header>
        
        <div class="flex items-center justify-between">
          <p>Flood Status</p>
          <p class="text-sm text-primary px-4 py- border-2 border-primary rounded-md">Green Level</p>
        </div>
      </template>
      <UTextarea
        class="w-full h-full"
        :ui="{
        base: 'h-full border-2 border-primary rounded-2xl',
      }"
        color="primary"
        :highlight="true"
        variant="outline"
        outline="solid"
        disabled
        value="This is the value"
      />
    </UCard>
</template>