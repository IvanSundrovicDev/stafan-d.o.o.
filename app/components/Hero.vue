<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";

const { t } = useI18n();
</script>

<template>
  <section id="pocetna" class="pt-20 sm:pt-24 overflow-hidden">
    <div class="hero-bg">
      <div class="bg-black-fade-to-right">
        <div class="section">
          <div class="max-w-2xl pt-16 sm:pt-24 pb-20 sm:pb-32">
            <h1
              class="font-heading text-5xl sm:text-6xl md:text-7xl leading-[0.95] uppercase"
            >
              {{ t("hero.titleLine1") }}
              <br />
              <span class="text-primary inline-block mt-3 sm:mt-4">{{
                t("hero.titleLine2")
              }}</span>
            </h1>

            <p class="mt-6 sm:mt-8 text-zinc-300 text-base sm:text-lg max-w-md">
              {{ t("hero.subtitle") }}
            </p>

            <div class="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#kontakt"
                class="btn-primary w-full sm:w-auto px-8 py-4 text-sm sm:text-base"
              >
                {{ t("hero.cta") }}
                <ArrowRight :size="18" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-bg {
  background-image: url("/images/hero.jpg");
  background-size: cover;
  background-position: center;
}

@media (width >= 64rem) {
  .bg-black-fade-to-right {
    background: linear-gradient(to right, black 0%, black 45%, transparent 75%);
  }
}

@media (width < 64rem) {
  .bg-black-fade-to-right {
    background: rgb(0 0 0 / 75%);
  }
}
</style>