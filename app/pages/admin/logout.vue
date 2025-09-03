<template>
    <h1>LOGGING OUT....</h1>
</template>

<script setup lang="ts">
    const { logout } = useAuth();

    onMounted(() => {
        logout();
    })
</script>