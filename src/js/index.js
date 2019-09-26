import CustomMarker from './CustomMarker';

document.addEventListener('DOMContentLoaded', () => {
  initMap();
});

function initMap(){
  const lat = 36.0652196;
  const lng = 136.219452;

  const options = {
    gestureHandling: 'greedy',
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(lat,lng),
    zoom: 14,
    clickableIcons: false
  };

  const map = new google.maps.Map(document.getElementById('map'), options);

  const marker = new CustomMarker(map,lat,lng);

  document.getElementById('deselected').addEventListener('click',() => {
    marker.setSelected(false);
  });

  document.getElementById('switch-display').addEventListener('click',() => {
    marker.setDisplay(!marker.isDisplay);
  });
}
