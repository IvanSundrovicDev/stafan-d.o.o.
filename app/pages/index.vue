<script setup>
const { t, locale } = useI18n();

const ogLocaleMap = {
  hr: "hr_HR",
  en: "en_US",
  de: "de_DE",
};

useSeoMeta({
  title: () => t("seo.title"),

  description: () => t("seo.description"),

  keywords:
    "izrada temelja, temelji Osijek, iskop temelja, iskopi Osijek, pripremni radovi, zemljani radovi, Osječko-baranjska županija, Stafan",

  ogTitle: () => t("seo.ogTitle"),

  ogDescription: () => t("seo.ogDescription"),

  ogType: "website",
  ogLocale: () => ogLocaleMap[locale.value] ?? "hr_HR",
  ogUrl: "https://stafan.netlify.app/",
  ogImage: {
    url: "https://stafan.netlify.app/twitter-card.webp",
    width: 1536,
    height: 1024,
    type: "image/webp",
    alt: "Stafan d.o.o. – građevinski radovi, iskopi i pripremni radovi",
  },

  twitterCard: "summary_large_image",
  twitterTitle: () => t("seo.twitterTitle"),
  twitterDescription: () => t("seo.twitterDescription"),
  twitterImage: "https://stafan.netlify.app/twitter-card.webp",
  twitterImageAlt:
    "Stafan d.o.o. – građevinski radovi, iskopi i pripremni radovi",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://stafan.netlify.app/",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
    {
      rel: "shortcut icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],

  meta: [
    {
      name: "apple-mobile-web-app-title",
      content: "Stafan d.o.o.",
    },
  ],

  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        "@id": "https://stafan.netlify.app/#generalcontractor",
        name: "Stafan d.o.o.",
        url: "https://stafan.netlify.app/",
        image: "https://stafan.netlify.app/images/logo.webp",
        priceRange: "$$",
        email: "josip.striskovic@gmail.com",
        telephone: "+385916403820",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Osječko-baranjska županija" },
          { "@type": "City", name: "Osijek" },
          { "@type": "City", name: "Đakovo" },
          { "@type": "City", name: "Valpovo" },
          { "@type": "City", name: "Našice" },
          { "@type": "City", name: "Belišće" },
          { "@type": "City", name: "Donji Miholjac" },
          { "@type": "City", name: "Beli Manastir" },
        ],
        serviceType: [
          "Izrada temelja",
          "Iskop temelja",
          "Pripremni radovi",
          "Zemljani radovi",
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: 45.5887,
          longitude: 18.3366,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Braće Radića 39",
          addressLocality: "Harkanovci",
          postalCode: "31550",
          addressRegion: "Osječko-baranjska županija",
          addressCountry: "HR",
        },
      }),
    },
  ],
});
</script>

<template>
  <main>
    <Header />

    <FadeIn>
      <Hero />
    </FadeIn>

    <FadeIn>
      <Services />
    </FadeIn>

    <FadeIn>
      <About class="bg-zinc-900" />
    </FadeIn>

    <FadeIn>
      <Projects />
    </FadeIn>

    <FadeIn>
      <Cta class="bg-zinc-900" />
    </FadeIn>

    <FadeIn>
      <Footer />
    </FadeIn>
  </main>
</template>
