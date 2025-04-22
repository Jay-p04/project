const address = "New York, USA";

fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    } else {
      console.log("No results found.");
    }
  });

  
