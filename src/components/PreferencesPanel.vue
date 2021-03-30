<script setup lang="ts">
import { editor } from '~/logic/preferences'
</script>

<template>
  <div class="p-4 text-left">
    <div>
      Preferences
    </div>
    <div class="subheader my-2">
      Open in Editor
    </div>
    <OptionsSwitch
      v-model="editor"
      :items="[
        { value: 'vscode', display: 'VS Code' },
        { value: 'vscode-insiders', display: 'VS Code Insiders' },
      ]"
    />
    <div class="subheader my-2">
      Reload
    </div>
    <ReloadButton />
  </div>
</template>
