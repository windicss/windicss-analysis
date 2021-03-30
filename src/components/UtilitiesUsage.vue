<script setup lang="ts">
import { categorized } from '~/logic'
</script>

<template>
  <div class="mb-5">
    <div class="subheader">
      Utilities Usage
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="{name, classes} of categorized"
        :key="name"
        class="p-4 rounded-md bg-gray-400 bg-opacity-5"
      >
        <div class="text-sm pb-4">
          <span class="capitalize">
            {{ name.replace(/([A-Z])/g, ' $1') }}
          </span>
          <sup class="opacity-50 ml-1">{{ classes.length }}</sup>
        </div>
        <ClassesList :classes="classes" count="count" />
      </div>
    </div>
  </div>
</template>
