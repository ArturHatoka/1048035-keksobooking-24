import {onDragMarker} from './form.js';

const startCoords = [35.6895000, 139.6917100];
const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const map = new L.map('map-canvas', {
  center: startCoords,
  zoom: 13,
  renderer: L.svg(),
});

const createSelectMarker = () => {
  const selectIcon = L.icon({
    iconUrl: '/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const selectMarkerOptions = {
    icon: selectIcon,
    draggable: true,
  };
  const selectMarker = new L.marker(startCoords, selectMarkerOptions);

  selectMarker.addEventListener('moveend', (e) => {
    onDragMarker(`${e.target._latlng.lat.toFixed(5)}, ${e.target._latlng.lng.toFixed(5)}`);
  });

  selectMarker.addTo(map);
};

const createAdvertMarker = (coords, offer) => {
  const icon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const markerOptions = {
    icon: icon,
  };
  const marker = new L.marker([coords.lat, coords.lng], markerOptions);
  marker.bindPopup(offer).openPopup();
  marker.addTo(map);
};

const renderMap = () => {
  onDragMarker(`${startCoords[0]}, ${startCoords[1]}`);
  createSelectMarker();
  map.addLayer(layer);

  return map;
};

export {renderMap, createAdvertMarker};
