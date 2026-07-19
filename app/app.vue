<script setup lang="ts">
const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale,
  },
  titleTemplate: "%s",
});
</script>

<template>
  <NuxtPage />
</template>