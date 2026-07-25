<script setup lang="ts">
import { Globe, Check, ChevronDown } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";

type LocaleCode = "hr" | "en" | "de";

const { locale, locales, setLocale, t } = useI18n();

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);

onClickOutside(root, () => {
  isOpen.value = false;
});

const availableLocales = computed(() =>
  locales.value.map((item) =>
    typeof item === "string"
      ? { code: item, name: item }
      : { code: item.code, name: item.name ?? item.code }
  )
);

const currentCode = computed(() => String(locale.value).toUpperCase());

const selectLocale = async (code: string) => {
  await setLocale(code as LocaleCode);
  isOpen.value = false;
};
</script>

<template>
  <div ref="root" class="relative" translate="no">
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-white/90 hover:bg-white/10 hover:text-primary transition cursor-pointer"
      :aria-label="t('a11y.selectLanguage')"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <Globe :size="18" />
      {{ currentCode }}
      <ChevronDown
        :size="16"
        class="transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] p-1.5"
      >
        <li v-for="loc in availableLocales" :key="loc.code">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-white/90 hover:bg-white/5 hover:text-primary transition cursor-pointer"
            :class="{ 'text-primary': loc.code === locale }"
            @click="selectLocale(loc.code)"
          >
            {{ loc.name }}
            <Check
              v-if="loc.code === locale"
              :size="16"
              class="text-primary shrink-0"
            />
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
