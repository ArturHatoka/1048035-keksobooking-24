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
  const selectMarker = new L.marker(startCoords, selectMarkerOptions);

  selectMarker.addEventListener('moveend', (e) => {
    setAddress(e.target._latlng.lat.toFixed(5), e.target._latlng.lng.toFixed(5));
  });

  return selectMarker;
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
  const selectMarker = createSelectMarker();

  setAddress(`${startCoords[0]}, ${startCoords[1]}`);
  selectMarker.addTo(map);
  map.addLayer(layer);

  return map;
};

const generateMarkers = (offers) => {
  offers.forEach((offer) => {
    const marker = createAdvertMarker(offer.offer.location);

    marker.bindPopup(generateCard(offer)).openPopup();
    marker.addTo(map);
  });
};

export {createMap, createAdvertMarker, generateMarkers};
