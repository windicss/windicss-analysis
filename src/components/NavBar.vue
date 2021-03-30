<script setup lang="ts">
import { name } from '~/logic'
</script>

<template>
  <nav class="container py-4 flex">
    <RouterLink class="flex" to="/">
      <Logo class="text-2xl m-auto -ml-1" />
      <div class="ml-2 my-auto">
        <div class="text-xl">
          Windi Analyzer
          <sup class="opacity-50 italic text-xs">Alpha</sup>
        </div>
        <div class="text-sm font-mono opacity-50">
          {{ name }}
        </div>
      </div>
    </RouterLink>

    <div class="flex-auto"></div>

    <SearchModal />
    <div class="flex gap-4">
      <a
        class="icon-button"
        href="https://github.com/windicss/windicss-analysis"
        target="_blank"
      >
        <carbon-logo-github class="text-xl" />
      </a>
      <SearchButton />
      <ReloadButton />
      <PreferencesButton />
      <DarkModeSwitch />
    </div>
  </nav>
</template>
