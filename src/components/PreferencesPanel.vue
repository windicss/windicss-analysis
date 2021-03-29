<script setup lang="ts">
import { editor } from '~/logic/preferences'
</script>

<template>
  <div class="p-4">
    <div class="subheader">
      Preferences
    </div>
    <div>
      Editor
    </div>
    <OptionsSwitch
      v-model="editor"
      :items="[
        { value: 'vscode', display: 'VS Code' },
        { value: 'vscode-insiders', display: 'VS Code Insiders' },
      ]"
    />
  </div>
</template>
