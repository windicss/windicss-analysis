<script setup lang="ts">
import { data } from '~/logic'
</script>

<template>
  <div class="container">
    <BackHome />
    <div class="subheader">
      JSON
    </div>
    <CodeBlock
      lang="json"
      :code="JSON.stringify(data, null, 2)"
    />
  </div>
</template>
