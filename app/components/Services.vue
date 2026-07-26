<script setup lang="ts">
import { Shovel, Truck, BrickWall, Wrench, Route } from "lucide-vue-next";

const { t } = useI18n();

const services = [
  { key: "excavation", icon: Shovel },
  { key: "preparation", icon: Truck },
  { key: "rental", icon: Wrench },
  { key: "roads", icon: Route },
];
</script>

<template>
  <section id="usluge" class="relative z-10 -mt-10 sm:-mt-14 mb-4">
    <div class="section">
      <div
        class="bg-primary text-dark rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.45)] grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/15"
      >
        <article
          v-for="service in services"
          :key="service.key"
          class="flex items-start gap-4 p-6 sm:p-7"
        >
          <component :is="service.icon" :size="34" :stroke-width="1.75" />

          <div>
            <h3
              class="font-heading text-lg uppercase tracking-wide leading-none"
            >
              {{ t(`services.${service.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm text-dark/80 leading-snug">
              {{ t(`services.${service.key}.description`) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>