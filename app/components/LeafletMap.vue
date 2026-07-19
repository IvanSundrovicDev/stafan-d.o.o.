<script setup lang="ts">
import L from "leaflet";

const { t, locale } = useI18n();

const mapRef = ref<HTMLElement | null>(null);
let mapInstance: L.Map | null = null;
let markerInstance: L.Marker | null = null;

const center: L.LatLngExpression = [45.5887, 18.3366];
const customMarkerIcon = L.icon({
  iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
  iconUrl: "/images/leaflet/marker-icon.png",
  shadowUrl: "/images/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

onMounted(() => {
  if (!mapRef.value) {
    return;
  }

  mapInstance = L.map(mapRef.value, {
    center,
    zoom: 15,
    scrollWheelZoom: false,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
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