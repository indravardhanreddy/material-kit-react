import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import { LoadScript, useLoadScript, GoogleMap, Polygon, Marker, KmlLayer, MarkerF, Data, OverlayView, GroundOverlay, InfoWindow, DrawingManager, MarkerClusterer, StandaloneSearchBox } from "@react-google-maps/api";
import { usePlacesWidget } from 'react-google-autocomplete';
import Items from "./Items";
import { Clusterer } from "@react-google-maps/marker-clusterer";
import { Dialog } from "primereact/dialog";
import png1 from '../../assets/images/1.png'
import markererpng from '../../assets/images/markererpng.png'
import { Toast } from 'primereact/toast';
import polygonicon from '../../assets/icons/mobirise21e04.svg'
import clusterericon from '../../assets/images/clusterer.svg'

import markericon from '../../assets/images/marker.svg'
import "./styles.css";
import { Button } from "primereact/button";
import { ProductService } from './ProductService';
import { DataScroller } from 'primereact/datascroller'
import { Card } from "primereact/card";
import { TabView } from "primereact/tabview";
import { TabPanel } from "primereact/tabview";
import { DataView } from "primereact/dataview";
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { OrderList } from 'primereact/orderlist';
import Iconify from "../../components/iconify";
import { color } from "d3";
import currlocation from '../../assets/images/currlocation.svg'

const libraries = ['drawing', 'places', 'geometry']

const Map = () => {
  const [loading, setLoading] = useState(true);

  const defaultCenter = { lat: 52.52047739093263, lng: 13.36653284549709 }
  // Store Polygon path in state
  const [path, setPath] = useState([
    {
      "lat": 52.52549080781086,
      "lng": 13.398118538856465
    },
    {
      "lat": 52.53603800395071,
      "lng": 13.347306771278328
    },
    {
      "lat": 52.5098219802041,
      "lng": 13.341813607215828
    },
    {
      "lat": 52.48578559055679,
      "lng": 13.36653284549709
    },
    {
      "lat": 52.48871246221608,
      "lng": 13.44618372440334
    },
    {
      "lat": 52.502507948267244,
      "lng": 13.505235238075203
    },
    {
      "lat": 52.5338452311616,
      "lng": 13.484635872840828
    },
    {
      "lat": 52.55597676760561,
      "lng": 13.421464486122078
    }
  ]);
  const [coords, setCoords] = useState({
    latitude: 0,
    longtitude: 0,
  });

  const searchBoxRef = useRef(null);



  const polygons1 = [
    {
      latLngs: [
        { lat: 37.774, lng: -122.419 },
        { lat: 37.795, lng: -122.414 },
        { lat: 37.795, lng: -122.404 },
        { lat: 37.774, lng: -122.409 }
      ],
      options: {
        fillColor: "red",
        strokeColor: "black"
      }
    },
    {
      latLngs: [
        { lat: 37.784, lng: -122.399 },
        { lat: 37.805, lng: -122.394 },
        { lat: 37.805, lng: -122.384 },
        { lat: 37.784, lng: -122.389 }
      ],
      options: {
        fillColor: "blue",
        strokeColor: "white"
      }
    },
    {
      latLngs: [
        { lat: 37.794, lng: -122.379 },
        { lat: 37.815, lng: -122.374 },
        { lat: 37.815, lng: -122.364 },
        { lat: 37.794, lng: -122.369 }
      ],
      options: {
        fillColor: "green",
        strokeColor: "yellow"
      }
    }
  ];

  const initialPolygons = [
    {
      id: 1,
      paths: [
        { lat: 14.906523, lng: 77.999847 },
        { lat: 14.906245, lng: 78.000874 },
        { lat: 14.905777, lng: 78.000737 },
        { lat: 14.906054, lng: 77.999737 },
      ],
    },
    {
      id: 2,
      paths: [
        { lat: 14.905123, lng: 77.999123 },
        { lat: 14.904567, lng: 78.001234 },
        { lat: 14.905678, lng: 78.001345 },
      ],
    },
    // Add more polygons as needed
  ];

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longtitude: position.coords.longitude,
        });

        setLoading(false);
      },
      (err) => {
        alert(
          "Couldn't retreive your location. Make sure you have given permission to access your location."
        );
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  const onSearchBoxLoad = (ref) => {
    // Store the reference to the search box for later use
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    // Get the places from the search box
    const places = searchBoxRef.current.getPlaces();
    // Do something with the places, e.g., display them on the map
  };

  const fetchNearbyCenters = async (map) => {
    console.log(map, "map")
    let service = new google.maps.places.PlacesService(map);

    console.log(service)

    service.nearbySearch(
      {
        location: {
          lat: coords.latitude,
          lng: coords.longtitude,
        },
        keyword: "Pizza",
        radius: 10000,
      },
      (results, status) => {
        if (results && results.length === 0) {
          alert("Couldn't find any recycling centres in 10 kilometers radius.");
          return;
        }

        console.log(results, "dusr")

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setMarkers(
            results.map((result) => ({
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              title: result.name,
              address: result.vicinity,
              isOpen: false,
            }))
          );
        }
      }
    );
  };


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
    libraries: libraries,
  });


  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];
  const markerClustererRef = useRef(null);

  useEffect(() => {
    ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
  }, []);

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const header = () => {
    return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />;
  };

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} />
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [isInfoWindowOpenMarkerer, setIsInfoWindowOpenMarkerer] = useState(false);

  // Memoize the map center coordinates to prevent unnecessary re-renders
  const mapCenter = useMemo(() => defaultCenter, []);

  // Define your markers as before
  const markers = [
    { id: 1, lat: 15.906523, lng: 73.999847, title: 'Tadipatri' },
    { id: 2, lat: 13.0827, lng: 80.2707, title: 'Chennai' },
    { id: 3, lat: 19.0760, lng: 72.8777, title: 'Mumbai' },
    { id: 4, lat: 28.6139, lng: 77.2090, title: 'New Delhi' },
    { id: 5, lat: 12.9716, lng: 77.5946, title: 'Bengaluru' },
    { id: 6, lat: 18.5204, lng: 73.8567, title: 'Pune' },
    { id: 7, lat: 22.5726, lng: 88.3639, title: 'Kolkata' },
    { id: 8, lat: 17.3850, lng: 78.4867, title: 'Hyderabad' },
    { id: 9, lat: 26.9124, lng: 75.7873, title: 'Jaipur' },
    { id: 10, lat: 23.2599, lng: 77.4126, title: 'Bhopal' },
    { id: 11, lat: 40.7128, lng: -74.0060, title: 'New York' },
    { id: 12, lat: 34.0522, lng: -118.2437, title: 'Los Angeles' },
    { id: 13, lat: 51.5074, lng: -0.12718, title: 'London' },
    { id: 14, lat: 48.8566, lng: 2.3522, title: 'Paris' },
    { id: 15, lat: 41.8781, lng: -87.6298, title: 'Chicago' },
    { id: 16, lat: 35.682839, lng: 139.759455, title: 'Tokyo' },
    { id: 18, lat: 51.5033, lng: -0.1195, title: 'Westminster' },
    { id: 19, lat: 51.4820, lng: -0.1125, title: 'Brixton' },
    { id: 20, lat: 51.5154, lng: -0.1412, title: 'Mayfair' },
    { id: 21, lat: 51.5099, lng: -0.1335, title: 'Soho' },
    // Add more markers as needed
  ];

  const [drawingMode, setDrawingMode] = useState(null);
  const [drawnCoordinates, setDrawnCoordinates] = useState([]);
  console.log(drawnCoordinates)

  // Define callback for when a shape is drawn
  const handleShapeDrawn = (shape) => {
    const path = shape.getPath();
    const coordinates = path.getArray().map((point) => {
      return { lat: point.lat(), lng: point.lng() };
    });
    setSelectedShape(shape);
    setDrawnCoordinates([...drawnCoordinates, coordinates]);
  };

  // Function to handle mouseover events on markers
  const handleMarkerMouseOver = (marker) => {
    setSelectedMarker(marker);
    setIsInfoWindowOpen(true);
  };

  const handleMarkererOver = (cluster) => {
    console.log(markerClustererRef.current)
    const clustererInstance = markerClustererRef.current;

    if (clustererInstance) {
      const markersInCluster = clustererInstance.getMarkers();

      // Now, markersInCluster contains an array of markers in the clicked cluster

      // You can access details of each marker in the cluster
      markersInCluster.forEach((marker) => {
        console.log('Marker ID:', marker.id);
        console.log('Latitude:', marker.getPosition().lat());
        console.log('Longitude:', marker.getPosition().lng());
        console.log('Title:', marker.title);
      });
    }

    setIsInfoWindowOpenMarkerer(true);
  };

  // Function to handle mouseout events on markers
  const handleMarkerMouseOut = () => {
    setSelectedMarker(null);
    setIsInfoWindowOpen(false);
  };

  const handleMarkerMouseOutMarkerer = () => {
    setIsInfoWindowOpen(false);
  };

  const [showText, setShowText] = useState("");
  const [visible, setVisible] = useState(true);
  const [showData, setShowData] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  console.log("selectedShape", selectedShape)
  console.log(path)

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    console.log("polygonRef", polygonRef.current)
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  const [polygons, setPolygons] = useState(initialPolygons);

  const handlePolygonEdit = (polygonId, updatedPaths) => {
    // Find the polygon to edit based on its ID
    const updatedPolygons = polygons.map((polygon) =>
      polygon.id === polygonId ? { ...polygon, paths: updatedPaths } : polygon
    );

    setPolygons(updatedPolygons);
  };

  let placesService;
  var map;

  const handleDeleteClick = () => {
    if (selectedShape) {
      selectedShape.setMap(null); // Removes the shape from the map
      setSelectedShape(null); // Clears the selected shape
    }
  };

  const handleDeleteAllClick = () => {
    console.log(e)
    if (selectedShape) {
      selectedShape.setMap(null); // Removes the shape from the map
      setSelectedShape(null);
      setDrawnCoordinates([]) // Clears the selected shape
    }
  };

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  const handleText = () => {
    setShowText("Entered")
  }

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      icon: iconBase + 'library_maps.png'
    },
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };



  const handleTextRemove = () => {
    setShowText("Removed")
  }
  console.log("path", path);

  const boxPosition = { lat: 0, lng: -100 }; // Adjust the coordinates as needed

  const boxContent = (
    <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      This is a box on the left side of the map.
    </div>
  );

  // Function to calculate the pixel position of the box based on the map center.
  const getPixelPositionOffset = (width, height) => ({
    x: -width / 2,
    y: -height / 2,
  });

  const YOUR_GEOJSON_OBJECT = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Feature 1',
        },
        geometry: {
          type: 'Point',
          coordinates: [defaultCenter.lat, defaultCenter.lng], // Replace with actual coordinates
        },
      },
      // Add more features as needed
    ],
  };

  const handleMarkerClick = (marker) => {
    // Implement logic to show an infowindow with marker details
    const infowindow = new google.maps.InfoWindow({
      content: `Marker ID: ${marker.id}<br>Latitude: ${marker.lat}<br>Longitude: ${marker.lng}<br>Title: ${marker.title}`,
    });

    infowindow.open(map, marker); // 'map' is your Google Map instance
  };

  useEffect(() => {
    // Set a timeout to display the data after 10 seconds
    const timer = setTimeout(() => {
      setShowData(true);
    }, 10000); // 10000 milliseconds (10 seconds)

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const [mapPlace, setMapPlace] = useState(null);

  const onLoadMap = (map) => {
    setMapPlace(map);
    // fetchNearbyCenters(map);
  };

  const [searchBox, setSearchBox] = useState(null);

  const customMapStyle = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: 'red' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: 'blue' }],
    },
    // Add more style rules as needed
  ];

  return (
    <div className="App">
      {!loading && !Boolean(coords.latitude) && (
        <div className="p-6 text-black/50">
          ⛔ Make sure you have given us permission to access your location (we
          are not storing your location).
        </div>
      )}

      {isLoaded && !loading && <GoogleMap
        mapContainerClassName="App-map"
        center={defaultCenter}
        zoom={3}
        version="weekly"
        on
        onLoad={onLoadMap}
        // onLoad={onLoadMap}
        options={{
          center: {
            lat: coords.latitude,
            lng: coords.longtitude,
          },
          styles: customMapStyle, // Apply the custom map style here
        }}
      >
        {showData && <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
          ref={searchBoxRef} // Assign the ref here
        >
          <input
            type="text"
            placeholder="Search for a location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </StandaloneSearchBox>}

        {showData && polygons.map((polygon) => (<Polygon
          // Make the Polygon editable / draggable
          editable
          // draggable
          key={polygon.id}
          paths={polygon.paths}
          // Event used when manipulating and adding points
          // onMouseUp={(e) => {
          //   // Capture the updated paths after editing
          //   handlePolygonEdit(polygon.id, e.getPath().getArray());
          // }}            
          // Event used when dragging the whole Polygon
          onDragEnd={(e) => {
            // Capture the updated paths after editing
            handlePolygonEdit(polygon.id, e.getPath().getArray());
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
          // onClick={setShowText("Hi")}
          options={{
            fillColor: "blue",
            strokeColor: "white",
            fillOpacity: 0.2,
            strokeWeight: 1,
            icon: {
              url: polygonicon, // URL to your custom icon image
              scaledSize: new google.maps.Size(50, 50), // Adjust the size as needed
            },
          }}
        />
        ))
        }

        <MarkerF
          position={{
            lat: coords.latitude,
            lng: coords.longtitude,
          }}
          icon={{
            url: currlocation, // URL to your custom icon image
            scaledSize: new google.maps.Size(15, 15), // Adjust the size as needed
          }}
        />

        {showData &&
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={50}
            zoomOnClick={true}
            options={{
              minimumClusterSize: 2,
            }}
            styles={[{
              url:markererpng , // Customize the cluster icon
              height: 60,
              width: 60,
              anchorText: [0, 0], // Position of the text inside the cluster icon
            }]}
            ref={markerClustererRef}
            onMouseOver={handleMarkererOver}
          >
            {(clusterer) =>
              markers.map((marker) => (

                <Marker
                  key={marker.id}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                    url: markericon, // URL to your custom icon image
                    scaledSize: new google.maps.Size(50, 50),
                  }}
                  label={{ text: marker.title.length.toString(), color: "white", fontSize: "10px", fontWeight: "bold" }}
                  onClick={() => handleMarkerMouseOver(marker)}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
        }


        {selectedMarker !== null && isInfoWindowOpen && (
          <div onMouseOut={handleMarkerMouseOut} >
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={handleMarkerMouseOut}
            >
              <div className="popup-content">
                <h3>{selectedMarker.title}</h3>
                <p>Latitude: {selectedMarker.lat}</p>
                <p>Longitude: {selectedMarker.lng}</p>
                <p>Location ID: {selectedMarker.id}</p>
              </div>

            </InfoWindow>
          </div>
        )}

        {isInfoWindowOpenMarkerer && (
          <div onMouseLeave={handleMarkerMouseOutMarkerer}>
            <InfoWindow
              position={defaultCenter}
              onCloseClick={handleMarkerMouseOutMarkerer}
            >
              <div className="popup-content">
                <h3>{"HI"}</h3>
                <p>Latitude: {"Hello"}</p>
              </div>

            </InfoWindow>
          </div>
        )}

        <KmlLayer
          url="./mountains.kml"
          options={{
            preserveViewport: true, // Keep the existing map viewport
            clickable: true, // Make the KML layer non-clickable
          }}
        />

        {/* {showData && <Data
            options={{
              controlPosition: google.maps.ControlPosition.TOP_CENTER,
              style: { width: '200px', height: '100px' },
              controls: ['Point', 'LineString', 'Polygon'],
              featureFactory: (geoJsonData) => {
                return {
                  properties: geoJsonData.properties,
                };
              },
            }}
            geoJson={YOUR_GEOJSON_OBJECT}
          />
          } */}

        {selectedShape !== null && <div><Button style={{ alignItems: 'flex-start' }} onClick={handleDeleteClick}>Delete</Button> <Button style={{ alignItems: 'flex-start' }} onClick={handleDeleteAllClick}>Delete All</Button></div>}

        {showData && <DrawingManager
          drawingMode={drawingMode}
          onPolygonComplete={handleShapeDrawn}
          onPolylineComplete={handleShapeDrawn}
          onCircleComplete={handleShapeDrawn}
          onRectangleComplete={handleShapeDrawn}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon', 'polyline', 'rectangle', 'circle'],
            },
            circleOptions: {
              fillColor: `#ffff00`,
              fillOpacity: 1,
              strokeWeight: 5,
              clickable: false,
              editable: true,
              zIndex: 1,
            },
            rectangleOptions: {
              fillColor: `#ffff00`,
              fillOpacity: 1,
              strokeWeight: 5,
              clickable: false,
              editable: true,
              zIndex: 1,
            },
          }}
        />}


        <Card className="md:w-25rem" style={{
          position: 'absolute',
          top: '40px', // Adjust the top position as needed
          left: '20px', // Adjust the left position as needed
          backgroundColor: 'white',
          padding: '2px',
          border: '1px solid #ccc',
          borderRadius: '30px',
        }}>
          <TabView>
            <TabPanel header="Projects">
              <DataScroller value={products} sortField={sortField} sortOrder={sortOrder} itemTemplate={itemTemplate} rows={20} inline scrollHeight="350px" header="Scroll Down to Load More" />
            </TabPanel>
            <TabPanel header="Developers">
              Content II
            </TabPanel>
            <TabPanel header="Locations">
              Content III
            </TabPanel>
          </TabView>
        </Card>

        {/* {showData &&<DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
            defaultOptions={{
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  google.maps.drawing.OverlayType.CIRCLE,
                  google.maps.drawing.OverlayType.POLYGON,
                  google.maps.drawing.OverlayType.POLYLINE,
                  google.maps.drawing.OverlayType.RECTANGLE,
                ],
              },
              circleOptions: {
                fillColor: `#ffff00`,
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1,
              },
            }}
          />} */}

      </GoogleMap>
      }
    </div>
  );
}

export default Map;