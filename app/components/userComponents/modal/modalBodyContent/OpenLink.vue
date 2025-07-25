<template>
    <div class="flex item-center justify-center w-full">
        <UButtonGroup class="w-full px-5">
            <UInput
                class="w-full"
                icon="i-lucide-search" 
                color="neutral"  
                variant="outline" 
                value="https://smartflood-detect.xyz" 
                disabled 
            />

            <UTooltip text="Copy to clipboard">
            <UButton
                color="primary"
                variant="solid"
                label="Open Link"
            />
            </UTooltip>
        </UButtonGroup>
    </div>
    <div>Click button to open link for user registration</div>
</template>