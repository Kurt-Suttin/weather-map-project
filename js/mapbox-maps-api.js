$(() => {

    // Global Variables
    const map = initializeMap();
    const marker = createMarker();
    const popup = createPopup();


    // Functions
    // Function that initializes the map
    function initializeMap() {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        const mapOptions = {
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 15,
            center: [-97.75206800629019, 30.267686234202444],
        }

        return new mapboxgl.Map(mapOptions);
    }

    // Function that creates a marker at Restaurant
    function createMarker() {
        return new mapboxgl.Marker()

    }

    // Function that creates a popup
    function createPopup() {
        return new mapboxgl.Popup()
            .setLngLat([-97.75206800629019, 30.267686234202444])

            .setHTML(`
                <div>
                    <h1>Restaurant</h1>
                    <p>We can put anything we want</p>
                </div>
            `);
    }

    // Function that brings me to True Food Kitchen, Austin
    function goToFavoriteRestaurant() {
        geocode(`True Food Kitchen, Austin`, MAPBOX_TOKEN).then((data) => {
            console.log(data);
            map.setCenter(data);
        })
    }

    // Function that uses reverse geocode
    // Takes the coordinates from the center of the map
    // And print on the screen the address
    function findAndPrintAddress() {
        const coords = map.getCenter();
        reverseGeocode(coords, MAPBOX_TOKEN).then((data) => {
            console.log(data);
            document.querySelector('h1').innerHTML = `${data}`;
        });
    }

    // Function that uses geocode to take the string 'The Alamo, San Antonio'
    // and get coordinates to set a marker and popup at that location
    function markRestaurant() {
        geocode('True Food Kitchen, Austin', MAPBOX_TOKEN).then((data) => {
            const alamoPopup = new mapboxgl.Popup()
                .setHTML(`<p>True Food Kitchen, Austin</p>`);
            const alamoMarker = new mapboxgl.Marker()
                .setLngLat(data)
                .addTo(map)
                .setPopup(alamoPopup);
            alamoPopup.addTo(map);
        })
    }


    // Events
    document.querySelector('#geocode-button').addEventListener('click', goToFavoriteRestaurant);
    document.querySelector('#reverse-geocode-button').addEventListener('click', findAndPrintAddress);
    document.querySelector('#mark-restaurant').addEventListener('click', markRestaurant);

    // Runs when the program loads
    // map.setZoom(1);
    marker.setPopup(popup);

    //Refactor your code to display at
    // least three of your favorite restaurants with information about each.
    // Create an array of objects with information about each restaurant to accomplish this.
    // Use a .forEach() loop rather than a for loop.

    const restaurants = [{
        title: 'Whataburger',
        address: '412 E Commerce St, San Antonio, TX 78205',
        rating: '1.5 stars',
    }, {
        title: 'Chart House',
        address: '739 E César E. Chávez Blvd, San Antonio, TX 78205',
        rating: '5 stars',
    }, {
        title: `Bohanan's Prime Steaks and Seafood`,
        address: ' 219 E Houston St #275, San Antonio, TX 78205',
        rating: '5 stars',
    }
    ];

    restaurants.forEach(restaurant => {
        geocode(restaurant.address, MAPBOX_TOKEN).then((data) => {
            const alamoPopup = new mapboxgl.Popup()
                .setHTML(`<p>${restaurant.title}</p>`);
            const alamoMarker = new mapboxgl.Marker()
                .setLngLat(data)
                .addTo(map)
                .setPopup(alamoPopup);

        })
    })
});