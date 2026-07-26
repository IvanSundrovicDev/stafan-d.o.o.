<script setup lang="ts">
import L from "leaflet";

const { t, locale } = useI18n();

const mapRef = ref<HTMLElement | null>(null);
let mapInstance: L.Map | null = null;
let markerInstance: L.Marker | null = null;

const center: L.LatLngExpression = [45.5887, 18.3366];
const customMarkerIcon = L.divIcon({
  className: "stafan-map-marker",
  html: "<span></span>",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [1, -34],
});

onMounted(() => {
  if (!mapRef.value) {
    return;
  }

  mapInstance = L.map(mapRef.value, {
    center,
    zoom: 14,
    scrollWheelZoom: false,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
      subdomains: "abcd",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  ).addTo(mapInstance);

  markerInstance = L.marker(center)
    .setIcon(customMarkerIcon)
    .addTo(mapInstance)
    .bindPopup(`<strong>Stafan d.o.o.</strong><br>${t("map.popup")}`);
});

watch(locale, () => {
  markerInstance?.setPopupContent(
    `<strong>Stafan d.o.o.</strong><br>${t("map.popup")}`
  );
});

onUnmounted(() => {
  markerInstance = null;
  mapInstance?.remove();
  mapInstance = null;
});
</script>

<template>
  <div
    ref="mapRef"
    class="w-full h-[240px] rounded-lg overflow-hidden"
    :aria-label="t('map.ariaLabel')"
  />
</template>

<style scoped>
:deep(.leaflet-container) {
  background: #18181b;
  font-family: "Inter", sans-serif;
}

:deep(.stafan-map-marker) {
  background: transparent;
  border: 0;
}

:deep(.stafan-map-marker span) {
  display: block;
  width: 22px;
  height: 22px;
  border: 3px solid #000;
  border-radius: 50% 50% 50% 0;
  background: #f5b301;
  box-shadow: 0 4px 12px rgb(0 0 0 / 55%);
  transform: rotate(-45deg);
}

:deep(.leaflet-popup-content-wrapper),
:deep(.leaflet-popup-tip) {
  background: #18181b;
  color: #fff;
}

:deep(.leaflet-popup-content) {
  color: #d4d4d8;
}

:deep(.leaflet-popup-content strong) {
  color: #f5b301;
}

:deep(.leaflet-control-zoom a) {
  border-color: rgb(255 255 255 / 10%);
  background: #18181b;
  color: #fff;
}

:deep(.leaflet-control-zoom a:hover) {
  background: #f5b301;
  color: #000;
}

:deep(.leaflet-control-attribution) {
  background: rgb(0 0 0 / 70%);
  color: #a1a1aa;
}

:deep(.leaflet-control-attribution a) {
  color: #f5b301;
}
</style>
