<template>
    <div class="flex justify-center gap-2">
        <UButton 
            @click="toggleLight"  
            :active="colorMode.preference === 'light'" 
            :ui="{base: 'h-12 px-5'}" 
            active-class="bg-primary !text-gray-100"
            inactive-class=""
            color="primary" 
            variant="outline">
            Light
        </UButton>
        <UButton 
            @click="toggleDark"   
            :active="colorMode.preference === 'dark'" 
            :ui="{base: 'h-12 px-5'}" 
            active-class="bg-primary !text-gray-800"
            inactive-class=""
            color="primary" 
            variant="outline">
            Dark
        </UButton>
    </div>
 
</template>

<script setup>

const colorMode = useColorMode()

function toggleLight() {
  colorMode.preference = 'light'
}

function toggleDark() {
  colorMode.preference = 'dark'
}

</script>
