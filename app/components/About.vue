<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ShieldCheck, HardHat, Users, ArrowRight } from "lucide-vue-next";

const { t } = useI18n();

const stats = [
  {
    value: 10,
    suffix: "+",
    labelKey: "about.stats.experience",
    icon: ShieldCheck,
  },
  { value: 100, suffix: "+", labelKey: "about.stats.projects", icon: HardHat },
  { value: 50, suffix: "+", labelKey: "about.stats.clients", icon: Users },
];

const statsContainer = ref<HTMLElement | null>(null);
const displayValues = ref<number[]>(stats.map(() => 0));

const runCountUp = () => {
  const duration = 1800;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    displayValues.value = stats.map((stat) => Math.round(stat.value * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

onMounted(() => {
  if (!statsContainer.value) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    displayValues.value = stats.map((stat) => stat.value);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        runCountUp();
        obs.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(statsContainer.value);
});
</script>

<template>
  <section
    id="o-nama"
    class="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[radial-gradient(120%_90%_at_10%_10%,rgba(245,179,1,0.08)_0%,rgba(0,0,0,0)_55%)]"
  >
    <div class="section grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <div class="flex items-center gap-3 mb-5">
          <span
            class="text-primary text-sm font-semibold uppercase tracking-widest"
          >
            {{ t("about.eyebrow") }}
          </span>
          <span class="h-px w-10 bg-primary" />
        </div>

        <h2
          class="font-heading text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.95] text-white"
        >
          {{ t("about.titleLine1") }}
          <br />
          <span class="text-primary">{{ t("about.titleLine2") }}</span>
        </h2>

        <p class="mt-6 text-zinc-400 text-base sm:text-lg max-w-xl">
          {{ t("about.description") }}
        </p>

        <div
          ref="statsContainer"
          class="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 lg:grid lg:grid-cols-3"
        >
          <div
            v-for="(stat, index) in stats"
            :key="stat.labelKey"
            class="card p-3 sm:p-4 flex items-center gap-3 sm:gap-4 lg:flex-col lg:items-start lg:gap-0"
          >
            <div
              class="inline-flex items-center justify-center rounded-xl bg-primary/10 size-12 sm:size-14 text-primary shrink-0"
            >
              <component :is="stat.icon" class="size-6 sm:size-7" />
            </div>
            <div class="min-w-0 lg:mt-3">
              <p
                class="font-heading text-2xl sm:text-4xl text-white tabular-nums leading-none"
              >
                {{ displayValues[index]
                }}<span class="text-primary">{{ stat.suffix }}</span>
              </p>
              <p
                class="mt-1 text-[11px] sm:text-xs uppercase tracking-wide text-zinc-500 leading-tight"
              >
                {{ t(stat.labelKey) }}
              </p>
            </div>
          </div>
        </div>

        <a href="#o-nama" class="btn-primary mt-8 sm:mt-10 px-8 py-4 text-sm">
          {{ t("about.cta") }}
          <ArrowRight :size="18" />
        </a>
      </div>

      <div class="relative">
        <img
          src="/images/about.jpg"
          alt="Stafan d.o.o. na gradilištu"
          loading="lazy"
          class="w-full h-[280px] sm:h-[420px] object-cover object-center rounded-lg border border-white/10"
        />
      </div>
    </div>
  </section>
</template>