<script setup lang="ts">
import { groups } from '~/logic'
</script>

<template>
  <div class="mb-5">
    <div class="subheader">
      Suggested Shortcuts
      <sup class="opacity-50 text-sm">{{ groups.length }}</sup>
    </div>
    <div class="flex flex-col space-y-4">
      <div
        v-for="shortcut of groups"
        :key="shortcut.class"
        class="p-4 rounded-md bg-gray-400 bg-opacity-5"
      >
        <GroupLabel
          :name="shortcut.class"
          :count="shortcut.uses.length.toString()"
        />
      </div>
    </div>
  </div>
</template>
