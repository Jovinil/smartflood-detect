<template>
  <header>
    <div class="container flex justify-between items-center px-10 py-4">
      <a href="/" class="text-gray-700 dark:text-gray-200 hover:text-primary font-bold">Smartflood Detect</a>
      <nav class="flex items-center">
        <DarkModeToggle />
        <BaseModal />

        <!-- implement an user auth that recognizes whether user is admin or user -->
        <Profile />
      </nav>
    </div>
  </header>
</template>
