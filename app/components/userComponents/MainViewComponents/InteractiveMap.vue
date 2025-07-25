<template>
 
  <UCard variant="subtle" :ui="{ root: 'flex flex-col', body: 'flex-1', footer: 'text-end  py-2' }" >
    <template #header>
      Interactive Map
    </template>
      <div class="h-full w-full">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15513.04792972334!2d124.23104319999997!3d13.580799499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1752130319365!5m2!1sen!2sph" class="h-full w-full" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    <template #footer>
      <UButton to="/userInteractiveMap" color="neutral" variant="outline">Button</UButton>
      <UButton color="neutral" variant="outline">View</UButton>
    </template>
  </UCard>

</template>
