<script setup lang="ts">
import { Phone, Mail, MapPin } from "lucide-vue-next";

const { t } = useI18n();

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    id="kontakt"
    class="border-t border-white/10 pt-14 sm:pt-20 pb-8 sm:pb-10"
  >
    <div class="section grid lg:grid-cols-3 gap-8 sm:gap-12">
      <div>
        <img src="/images/logo.png" alt="Stafan d.o.o." class="h-16 sm:h-20" />

        <p class="text-zinc-400 mt-4 sm:mt-6 text-sm sm:text-base max-w-sm">
          {{ t("footer.tagline") }}
        </p>
      </div>

      <div>
        <h3 class="font-heading text-lg sm:text-xl uppercase tracking-wide">
          {{ t("footer.contact") }}
        </h3>

        <div class="mt-4 sm:mt-6 space-y-4 text-zinc-300 text-sm sm:text-base">
          <a
            href="tel:+385916403820"
            class="flex items-center gap-3 hover:text-primary transition"
          >
            <Phone :size="18" class="text-primary shrink-0" />
            091 640 3820
          </a>

          <a
            href="mailto:josip.striskovic@gmail.com"
            class="flex items-center gap-3 hover:text-primary transition"
          >
            <Mail :size="18" class="text-primary shrink-0" />
            josip.striskovic@gmail.com
          </a>

          <p class="flex items-center gap-3">
            <MapPin :size="18" class="text-primary shrink-0" />
            {{ t("footer.location") }}
          </p>
        </div>
      </div>

      <div>
        <ClientOnly>
          <LeafletMap />
          <template #fallback>
            <div
              class="w-full h-[240px] rounded-lg bg-black/30 border border-white/10"
            />
          </template>
        </ClientOnly>
      </div>
    </div>

    <div
      class="section mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-2 sm:justify-between text-zinc-500 text-xs sm:text-sm"
    >
      <p>© {{ currentYear }} Stafan d.o.o. {{ t("footer.rights") }}</p>
    </div>
  </footer>
</template>