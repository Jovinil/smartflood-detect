<template>
  <ThemeToggle class="mb-2 mt-4"/>
  <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
  <form @submit.prevent="handleLogin" method="post">
    <div>
      <p class="text-[12px] text-gray-700 dark:text-gray-400 mb-2">Username</p>
          <UInput 
          color="neutral" 
          variant="subtle" 
          icon="i-lucide-user" 
          placeholder="Username" 
          type="email"
          class="mb-3 w-full"
          v-model="email"
        />
    </div>
    <div>
      <p class="text-[12px] text-gray-700 dark:text-gray-400 mb-2">Password</p>
      <UInput 
        color="neutral" 
        variant="subtle" 
        icon="i-lucide-lock" 
        placeholder="Password" 
        type="password"
        class="mb-3 w-full"
        v-model="password"
      />

    </div>
      <!-- UI NEEDS WORK -->
    <p class="text-[12px] text-gray-700 dark:text-red-400 mb-2">{{ errorMessage }}</p>
    <div class="text-end w-full">
      <UButton 
        :color="themeStore.colorMode === 'light' ? 'info' : 'primary'" 
        variant="outline" 
        type="submit">
        Login
      </UButton>
    </div>
  </form>
  
  <div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/app/stores/useThemeStore';

definePageMeta({
  layout: 'login' 
})

const themeStore = useThemeStore();

const email = ref('')
const password = ref('')
const { errorMessage, login} = useAuth();

const handleLogin = async () => {
  await(login(email.value, password.value));
}

</script>