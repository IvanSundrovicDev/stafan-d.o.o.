<script setup>
import { Phone, Mail, MapPin, CircleCheck } from "lucide-vue-next";

const { t } = useI18n();

const features = ["quote", "response", "machinery", "coverage"];
</script>

<template>
  <section
    class="relative overflow-hidden"
  >
    <div
      class="section py-14 sm:py-20 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <div>
        <div class="flex items-center gap-3 mb-5">
          <span
            class="text-primary text-sm font-semibold uppercase tracking-widest"
          >
            {{ t("cta.eyebrow") }}
          </span>
          <span class="h-px w-10 bg-primary" />
        </div>

        <h2
          class="font-heading text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.2] text-white"
        >
          {{ t("cta.titleLine1") }}
          <span class="text-primary">{{ t("cta.titleLine2") }}</span>
        </h2>
        <p class="mt-4 text-zinc-400 text-base sm:text-lg max-w-xl">
          {{ t("cta.subtitle") }}
        </p>

        <ul class="mt-7 sm:mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          <li
            v-for="feature in features"
            :key="feature"
            class="flex items-center gap-3 text-sm sm:text-base text-zinc-300"
          >
            <CircleCheck :size="20" class="text-primary shrink-0" />
            {{ t(`cta.features.${feature}`) }}
          </li>
        </ul>
      </div>

      <div
        class="w-full lg:justify-self-end lg:max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <h3 class="font-heading text-xl uppercase tracking-wide text-white">
          {{ t("cta.card.title") }}
        </h3>
        <p class="mt-2 text-sm text-zinc-400">
          {{ t("cta.card.subtitle") }}
        </p>

        <a
          href="tel:+385916403820"
          class="group mt-6 flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-primary/40"
        >
          <span
            class="inline-flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0"
          >
            <Phone :size="20" />
          </span>
          <span class="min-w-0">
            <span class="block text-xs uppercase tracking-wide text-zinc-500">
              {{ t("cta.card.callLabel") }}
            </span>
            <span
              class="block text-base font-medium text-white transition group-hover:text-primary"
            >
              091 640 3820
            </span>
          </span>
        </a>

        <a
          href="mailto:josip.striskovic@gmail.com"
          class="group mt-3 flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-primary/40"
        >
          <span
            class="inline-flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0"
          >
            <Mail :size="20" />
          </span>
          <span class="min-w-0">
            <span class="block text-xs uppercase tracking-wide text-zinc-500">
              {{ t("cta.card.mailLabel") }}
            </span>
            <span
              class="block text-base font-medium text-white transition group-hover:text-primary"
            >
              josip.striskovic@gmail.com
            </span>
          </span>
        </a>

        <a
          href="https://www.google.com/maps/search/?api=1&query=45.5887,18.3366"
          target="_blank"
          rel="noopener noreferrer"
          class="group mt-3 flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-primary/40"
        >
          <span
            class="inline-flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0"
          >
            <MapPin :size="20" />
          </span>
          <span class="min-w-0">
            <span class="block text-xs uppercase tracking-wide text-zinc-500">
              {{ t("cta.card.locationLabel") }}
            </span>
            <span
              class="block text-base font-medium text-white transition group-hover:text-primary"
            >
              {{ t("footer.location") }}
            </span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>