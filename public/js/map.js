const getmap = () => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        

        const map = L.map('map')
        .setView([lat, lon], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoicmFkb2xsOTMiLCJhIjoiY2t3czcwYnZwMTNwaTJubzR5cHM4b25mMSJ9.g6KsCoqe3O1wDM1mrDRi7A'
        }).addTo(map)


        L.marker([lat, lon]).addTo(map)


        const searchControl = L.esri.Geocoding.geosearch({
            position: 'topright',
            placeholder: 'Enter an address or place',
            useMapBounds: false,
            providers: [L.esri.Geocoding.arcgisOnlineProvider({
              apikey: 'AAPKd4df3446b9464e329446d3eb240d2da3emjR5S6zZbrlnMQVQMPIM829_ojm-4dezJMOqDWPBdgY0zdIyu0spqZviPfMpsgf'
            })]
          }).addTo(map);
        
        const results = L.layerGroup().addTo(map);
        
        searchControl.on('results', function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
            results.addLayer(L.marker(data.results[i].latlng));
        }
        });

      }
        
}

getmap()

const addCourseReview = async (event) => {
  event.preventDefault();

  document.location.replace('/addCourseReview');
  
};

document
  .querySelector('.leaflet-marker-icon')
  .addEventListener('click', addCourseReview);
