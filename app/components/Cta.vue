<script setup>
import { ArrowRight } from "lucide-vue-next";

const { t } = useI18n();
</script>

<template>
  <section
    class="relative overflow-hidden border-y border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(245,179,1,0.10)_0%,rgba(0,0,0,0)_55%),#0d0d0d]"
  >
    <div
      class="section py-14 sm:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
    >
      <div>
        <h2
          class="font-heading text-3xl sm:text-4xl lg:text-5xl uppercase leading-[0.95] text-white"
        >
          {{ t("cta.titleLine1") }}
          <span class="text-primary">{{ t("cta.titleLine2") }}</span>
        </h2>
        <p class="mt-4 text-zinc-400 text-base sm:text-lg">
          {{ t("cta.subtitle") }}
        </p>
      </div>

      <a
        href="#kontakt"
        class="btn-primary shrink-0 px-8 py-4 text-sm sm:text-base"
      >
        {{ t("cta.button") }}
        <ArrowRight :size="18" />
      </a>
    </div>
  </section>
</template>