<script setup lang="ts">
import { Menu, X, Phone } from "lucide-vue-next";

const { t } = useI18n();

const isMobileMenuOpen = ref(false);

const links = [
  { key: "nav.home", href: "#pocetna" },
  { key: "nav.about", href: "#o-nama" },
  { key: "nav.projects", href: "#projekti" },
  { key: "nav.contact", href: "#kontakt" },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/5 will-change-transform"
  >
    <div class="section">
      <div class="h-20 sm:h-24 flex items-center justify-between">
        <a href="#pocetna" class="shrink-0">
          <img
            src="/images/logo.png"
            alt="Stafan d.o.o."
            class="h-14 sm:h-20 w-auto"
          />
        </a>

        <nav
          class="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-wide"
        >
          <a
            v-for="link in links"
            :key="link.key"
            :href="link.href"
            class="text-white/80 hover:text-primary transition"
          >
            {{ t(link.key) }}
          </a>
        </nav>

        <div class="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />

          <a
            href="tel:+385916403820"
            class="btn-outline inline-flex px-5 py-2.5 text-sm normal-case tracking-normal"
          >
            <Phone :size="18" />
            091 640 3820
          </a>
        </div>

        <button
          type="button"
          class="lg:hidden cursor-pointer inline-flex items-center justify-center w-11 h-11 rounded-md border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 transition"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="
            isMobileMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')
          "
          @click="toggleMobileMenu"
        >
          <X v-if="isMobileMenuOpen" :size="20" />
          <Menu v-else :size="20" />
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
        <button
          v-if="isMobileMenuOpen"
          type="button"
          class="lg:hidden fixed inset-0 top-20 sm:top-24 bg-black/50 backdrop-blur-[1px]"
          :aria-label="t('a11y.closeMenu')"
          @click="closeMobileMenu"
        />
      </Transition>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4 scale-[0.98]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-4 scale-[0.98]"
      >
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden absolute top-[calc(100%-0.25rem)] left-3 right-3 sm:left-4 sm:right-4 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] p-4 sm:p-5"
        >
          <div class="flex justify-end mb-3">
            <LanguageSwitcher />
          </div>

          <nav class="flex flex-col gap-2">
            <a
              v-for="link in links"
              :key="`mobile-${link.key}`"
              :href="link.href"
              class="px-4 py-3 rounded-md text-white/90 uppercase tracking-wide text-sm hover:text-primary hover:bg-white/5 transition"
              @click="closeMobileMenu"
            >
              {{ t(link.key) }}
            </a>
          </nav>

          <a
            href="tel:+385916403820"
            class="btn-primary mt-4 w-full px-6 py-3"
            @click="closeMobileMenu"
          >
            <Phone :size="18" />
            091 640 3820
          </a>
        </div>
      </Transition>
    </div>
  </header>
</template>