import {setAddress} from './form.js';
import {generateCard} from './generateElems.js';

const startCoords = [35.6895000, 139.6917100];
const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const map = new L.map('map-canvas', {
  center: startCoords,
  zoom: 13,
  renderer: L.svg(),
});

const createSelectMarker = () => {
  const selectIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const selectMarkerOptions = {
    icon: selectIcon,
    draggable: true,
  };
  const marker = new L.marker(startCoords, selectMarkerOptions);

  marker.addEventListener('moveend', (e) => {
    setAddress(e.target._latlng.lat.toFixed(5), e.target._latlng.lng.toFixed(5));
  });

  return marker;
};

const selectMarker = createSelectMarker();

const setDefaultCoordsSelectMarker = () => {
  selectMarker.setLatLng(startCoords);
};

const createAdvertMarker = (coords) => {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const markerOptions = {
    icon: icon,
  };

  return new L.marker([coords.lat, coords.lng], markerOptions);
};

const createMap = () => {
  selectMarker.addTo(map);
  map.addLayer(layer);

  return map;
};

const markerGroup = L.layerGroup().addTo(map);

const generateMarkers = (offers) => {
  markerGroup.clearLayers();
  offers.forEach((offer) => {
    const marker = createAdvertMarker(offer.location);

    marker.bindPopup(generateCard(offer)).openPopup();
    marker.addTo(markerGroup);
  });
};

export {createMap, createAdvertMarker, generateMarkers, setDefaultCoordsSelectMarker};
