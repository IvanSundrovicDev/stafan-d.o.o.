<script setup lang="ts">
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-vue-next";

const { t } = useI18n();

const projects = [
  {
    slug: "residential-site",
    cover: "/images/projects/project1/1.webp",
    images: Array.from(
      { length: 6 },
      (_, index) => `/images/projects/project1/${index + 1}.webp`
    ),
    scopeKeys: ["one", "two", "three"],
  },
  {
    slug: "urban-excavation",
    cover: "/images/projects/project2/1.webp",
    images: Array.from(
      { length: 3 },
      (_, index) => `/images/projects/project2/${index + 1}.webp`
    ),
    scopeKeys: ["one", "two", "three"],
  },
];

const selectedProject = ref<(typeof projects)[number] | null>(null);
const activeImageIndex = ref<number | null>(null);
const lightboxTouchStartX = ref(0);
const lightboxTouchStartY = ref(0);
const projectsSection = ref<HTMLElement | null>(null);

const scrollToProjects = () => {
  if (!projectsSection.value) {
    return;
  }

  const oneRem =
    Number.parseFloat(getComputedStyle(document.documentElement).fontSize);

  window.scrollTo({
    top: Math.max(
      0,
      window.scrollY + projectsSection.value.getBoundingClientRect().top - oneRem
    ),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
};

const activeImage = computed(() => {
  if (selectedProject.value === null || activeImageIndex.value === null) {
    return null;
  }

  return selectedProject.value.images[activeImageIndex.value];
});

const openProject = (project: (typeof projects)[number]) => {
  selectedProject.value = project;
  scrollToProjects();
};

const closeProject = () => {
  activeImageIndex.value = null;
  selectedProject.value = null;
  scrollToProjects();
};

const openImage = (index: number) => {
  activeImageIndex.value = index;
};

const closeLightbox = () => {
  activeImageIndex.value = null;
};

const changeImage = (direction: number) => {
  if (selectedProject.value === null || activeImageIndex.value === null) {
    return;
  }

  const imageCount = selectedProject.value.images.length;
  activeImageIndex.value =
    (activeImageIndex.value + direction + imageCount) % imageCount;
};

const onLightboxTouchStart = (event: TouchEvent) => {
  lightboxTouchStartX.value = event.changedTouches[0].clientX;
  lightboxTouchStartY.value = event.changedTouches[0].clientY;
};

const onLightboxTouchEnd = (event: TouchEvent) => {
  const swipeDistance = lightboxTouchStartX.value - event.changedTouches[0].clientX;
  const verticalDistance =
    lightboxTouchStartY.value - event.changedTouches[0].clientY;

  if (
    Math.abs(swipeDistance) < 50 ||
    Math.abs(swipeDistance) < Math.abs(verticalDistance)
  ) {
    return;
  }

  changeImage(swipeDistance > 0 ? 1 : -1);
};
</script>

<template>
  <section ref="projectsSection" id="projekti" class="scroll-mt-4 pt-16 pb-16 sm:pt-24 sm:pb-24">
    <div class="section">
      <div class="mb-8 flex items-center gap-3 sm:mb-12">
        <h2 class="font-heading text-2xl uppercase tracking-wide text-white sm:text-3xl">
          {{ t("projects.title") }}
        </h2>
        <span class="h-px max-w-40 flex-1 bg-white/15" />
      </div>

      <Transition name="project-view" mode="out-in">
        <div
          v-if="!selectedProject"
          key="project-list"
          class="grid gap-5 sm:grid-cols-2 sm:gap-6"
        >
          <button
            v-for="project in projects"
            :key="project.slug"
            type="button"
            class="group cursor-pointer text-left"
            @click="openProject(project)"
          >
            <div class="overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <img
                :src="project.cover"
                :alt="t(`projects.items.${project.slug}.title`)"
                loading="lazy"
                class="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div class="mt-4 flex items-end justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {{ t(`projects.items.${project.slug}.category`) }}
                </p>
                <h3 class="mt-2 font-heading text-xl uppercase tracking-wide text-white transition group-hover:text-primary sm:text-2xl">
                  {{ t(`projects.items.${project.slug}.title`) }}
                </h3>
              </div>
              <ArrowRight class="mb-1 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" :size="22" />
            </div>
          </button>
        </div>

        <article v-else key="project-detail" class="project-detail">
          <button
            type="button"
            class="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-300 transition hover:text-primary"
            @click="closeProject"
          >
            <ArrowLeft :size="18" />
            {{ t("projects.back") }}
          </button>

          <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {{ t(`projects.items.${selectedProject.slug}.category`) }}
              </p>
              <h3 class="mt-3 font-heading text-4xl uppercase leading-none text-white sm:text-5xl">
                {{ t(`projects.items.${selectedProject.slug}.title`) }}
              </h3>
              <p class="mt-6 text-lg leading-relaxed text-zinc-300">
                {{ t(`projects.items.${selectedProject.slug}.intro`) }}
              </p>
              <div class="mt-7 space-y-4 leading-relaxed text-zinc-400">
                <p>{{ t(`projects.items.${selectedProject.slug}.paragraph1`) }}</p>
                <p>{{ t(`projects.items.${selectedProject.slug}.paragraph2`) }}</p>
              </div>

              <div class="mt-8 border-l-2 border-primary pl-5">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {{ t("projects.scopeTitle") }}
                </p>
                <ul class="mt-3 space-y-2 text-zinc-300">
                  <li v-for="scopeKey in selectedProject.scopeKeys" :key="scopeKey">
                    {{ t(`projects.items.${selectedProject.slug}.scope.${scopeKey}`) }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 self-start">
              <button
                v-for="(image, index) in selectedProject.images"
                :key="image"
                type="button"
                class="group/image relative cursor-pointer overflow-hidden rounded-lg border border-white/10"
                :class="index === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'"
                :aria-label="t('projects.openImage')"
                @click="openImage(index)"
              >
                <img
                  :src="image"
                  :alt="`${t(`projects.items.${selectedProject.slug}.title`)} — ${index + 1}`"
                  loading="lazy"
                  class="size-full object-cover transition duration-500 group-hover/image:scale-105"
                />
                <span class="absolute inset-0 bg-black/0 transition group-hover/image:bg-black/20" />
              </button>
            </div>
          </div>

          <button
            type="button"
            class="btn-primary mt-10 cursor-pointer px-7 py-3 text-sm"
            @click="closeProject"
          >
            {{ t("projects.back") }}
            <X :size="18" />
          </button>
        </article>
      </Transition>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="activeImage"
          class="fixed inset-0 z-[2000] flex cursor-pointer items-center justify-center bg-black/90 p-4 touch-pan-y backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          :aria-label="t('projects.openImage')"
          @click="closeLightbox"
          @touchstart="onLightboxTouchStart"
          @touchend="onLightboxTouchEnd"
        >
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex cursor-pointer items-center gap-2 border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-primary hover:bg-primary hover:text-dark sm:right-8 sm:top-8"
            @click.stop="closeLightbox"
          >
            {{ t("projects.close") }}
            <X :size="16" />
          </button>
          <button
            type="button"
            class="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition hover:border-primary hover:bg-primary hover:text-dark sm:left-8"
            :aria-label="t('projects.previous')"
            @click.stop="changeImage(-1)"
          >
            <ChevronLeft :size="24" />
          </button>
          <button
            type="button"
            class="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition hover:border-primary hover:bg-primary hover:text-dark sm:right-8"
            :aria-label="t('projects.next')"
            @click.stop="changeImage(1)"
          >
            <ChevronRight :size="24" />
          </button>
          <img
            :src="activeImage"
            :alt="t(`projects.items.${selectedProject?.slug}.title`)"
            class="max-h-full max-w-full cursor-default rounded-lg object-contain"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.project-view-enter-active,
.project-view-leave-active {
  transition: opacity 350ms ease, transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
}

.project-view-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}

.project-view-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 250ms ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .project-view-enter-active,
  .project-view-leave-active,
  .lightbox-enter-active,
  .lightbox-leave-active {
    transition: none;
  }
}
</style>
