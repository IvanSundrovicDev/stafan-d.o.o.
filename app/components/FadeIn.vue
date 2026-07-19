<script setup>
const el = ref();

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    },
    { threshold: 0.1 }
  );

  observer.observe(el.value);
});
</script>

<template>
  <div ref="el" class="fade">
    <slot />
  </div>
</template>

<style scoped>
.fade {
  opacity: 0;
  transform: translateY(30px);
  transition: 0.8s;
}

.show {
  opacity: 1;
  transform: none;
}
</style>