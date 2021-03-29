<template>
  <nav class="py-4 px-6 border-b duotone-border flex">
    <RouterLink class="flex" to="/">
      <Logo class="text-2xl m-auto" />
      <span class="ml-2 my-auto text-xl">Windi CSS Analyzer</span>
    </RouterLink>

    <div class="flex-auto"></div>

    <DarkModeSwitch />
  </nav>
</template>
