<script setup>
import { ArrowRight } from "lucide-vue-next";

const { t } = useI18n();

const projects = [
  { src: "/images/gallery/1.jpg", labelKey: "projects.items.foundations" },
  { src: "/images/gallery/2.jpg", labelKey: "projects.items.concrete" },
  { src: "/images/gallery/3.jpg", labelKey: "projects.items.landscaping" },
  { src: "/images/gallery/4.jpg", labelKey: "projects.items.preparation" },
];

const selectedIndex = ref(null);
const touchStartX = ref(0);
const touchEndX = ref(0);

const selectedProject = computed(() => {
  if (selectedIndex.value === null) {
    return null;
  }

  return projects[selectedIndex.value];
});

const openProject = (index) => {
  selectedIndex.value = index;
};

const closeProject = () => {
  selectedIndex.value = null;
};

const showNextProject = () => {
  if (selectedIndex.value === null) {
    return;
  }

  selectedIndex.value = (selectedIndex.value + 1) % projects.length;
};

const showPreviousProject = () => {
  if (selectedIndex.value === null) {
    return;
  }

  selectedIndex.value =
    (selectedIndex.value - 1 + projects.length) % projects.length;
};

const onTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0].clientX;
};

const onTouchEnd = (event) => {
  touchEndX.value = event.changedTouches[0].clientX;
  const swipeDistance = touchStartX.value - touchEndX.value;

  if (Math.abs(swipeDistance) < 50) {
    return;
  }

  if (swipeDistance > 0) {
    showNextProject();
  } else {
    showPreviousProject();
  }
};

const onKeydown = (event) => {
  if (event.key === "Escape") {
    closeProject();
  }

  if (event.key === "ArrowRight") {
    showNextProject();
  }

  if (event.key === "ArrowLeft") {
    showPreviousProject();
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <section id="projekti" class="pt-16 sm:pt-24 pb-16 sm:pb-24">
    <div class="section">
      <div class="flex items-center gap-3 mb-8 sm:mb-12">
        <h2
          class="font-heading text-2xl sm:text-3xl uppercase tracking-wide text-white"
        >
          {{ t("projects.title") }}
        </h2>
        <span class="h-px flex-1 max-w-40 bg-white/15" />
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <button
          v-for="(project, index) in projects"
          :key="project.labelKey"
          type="button"
          class="group text-left cursor-pointer"
          @click="openProject(index)"
        >
          <div class="overflow-hidden rounded-lg border border-white/10">
            <img
              :src="project.src"
              :alt="t(project.labelKey)"
              loading="lazy"
              class="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
          <p
            class="mt-3 font-heading text-sm sm:text-base uppercase tracking-wide text-white group-hover:text-primary transition"
          >
            {{ t(project.labelKey) }}
          </p>
        </button>
      </div>

      <div class="flex justify-center mt-10 sm:mt-14">
        <button
          type="button"
          class="btn-primary px-8 py-4 text-sm cursor-pointer"
          @click="openProject(0)"
        >
          {{ t("projects.viewAll") }}
          <ArrowRight :size="18" />
        </button>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 md:p-8"
          @click="closeProject"
        >
          <button
            type="button"
            class="absolute top-4 right-4 md:top-6 md:right-6 text-white text-sm uppercase tracking-widest border border-white/40 px-4 py-2 rounded-full hover:bg-primary hover:text-dark hover:border-primary transition cursor-pointer"
            @click.stop="closeProject"
          >
            {{ t("projects.close") }}
          </button>

          <button
            type="button"
            class="absolute left-4 top-1/2 -translate-y-1/2 md:left-6 text-white text-2xl border border-white/40 w-11 h-11 rounded-full hover:bg-primary hover:text-dark hover:border-primary transition cursor-pointer"
            :aria-label="t('projects.previous')"
            @click.stop="showPreviousProject"
          >
            ‹
          </button>

          <button
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 md:right-6 text-white text-2xl border border-white/40 w-11 h-11 rounded-full hover:bg-primary hover:text-dark hover:border-primary transition cursor-pointer"
            :aria-label="t('projects.next')"
            @click.stop="showNextProject"
          >
            ›
          </button>

          <div
            class="w-full h-full flex flex-col items-center justify-center gap-4"
            @click.stop
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
            <Transition
              mode="out-in"
              enter-active-class="transition-opacity duration-300 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <img
                :key="selectedProject.src"
                :src="selectedProject.src"
                :alt="t(selectedProject.labelKey)"
                class="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </Transition>

            <p
              class="font-heading uppercase tracking-wide text-primary text-lg"
            >
              {{ t(selectedProject.labelKey) }}
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>