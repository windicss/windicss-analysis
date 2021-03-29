<script setup lang="ts">
import { categorized } from '~/logic/data'
</script>

<template>
  <div class="container">
    <div>Utilities Usage</div>
    <div
      v-for="{name, classes} of categorized"
      :key="name"
      class="p-4 my-3 rounded-md bg-gray-400 bg-opacity-5"
    >
      <div class="text-sm pb-1">
        <span class="capitalize">
          {{ name.replace(/([A-Z])/g, ' $1') }}
        </span>
        <sup class="opacity-50 ml-1">{{ classes.length }}</sup>
      </div>
      <ClassesList :classes="classes" />
    </div>
  </div>
</template>
