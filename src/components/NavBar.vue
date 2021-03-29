<script setup lang="ts">
import { name } from '~/logic'
</script>

<template>
  <nav class="container py-4 flex">
    <RouterLink class="flex" to="/">
      <Logo class="text-2xl m-auto -ml-1" />
      <div class="ml-2 my-auto">
        <div class="text-xl">
          Windi CSS Analyzer
        </div>
        <div class="text-sm font-mono opacity-50">
          {{ name }}
        </div>
      </div>
    </RouterLink>

    <div class="flex-auto"></div>

    <DarkModeSwitch class="text-xl" />
  </nav>
</template>
