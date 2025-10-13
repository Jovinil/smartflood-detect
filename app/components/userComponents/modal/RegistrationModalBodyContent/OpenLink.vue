<template>
    <div class="flex item-center justify-center w-full">
        <UButtonGroup class="w-full px-5">
            <UInput
                class="w-full"
                icon="i-lucide-search" 
                color="neutral"  
                variant="outline" 
                :value=value 
                disabled 
                v-model="value"
                :ui="{ trailing: 'pr-0.5' }"
            >
                <template v-if="value?.length" #trailing>
                    <UButton
                    :color="copied ? 'success' : 'neutral'"
                    variant="link"
                    size="xl"
                    :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                    aria-label="Copy to clipboard"
                    @click="copy(value)"
                    />
                </template>
            </UInput>

            <UButton
                color="primary"
                variant="solid"
                label="Open Link"
                to="/user/registration/"
            />
        </UButtonGroup>
    </div>
    <div>Click button to open link for user registration</div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const value = ref('https://smartflood-detect.vercel.app/user/registration/')

const { copy, copied } = useClipboard()
</script>   