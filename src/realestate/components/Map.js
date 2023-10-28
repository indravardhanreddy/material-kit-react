import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon, Marker, KmlLayer, Data, OverlayView, GroundOverlay, InfoWindow, DrawingManager, MarkerClusterer, StandaloneSearchBox } from "@react-google-maps/api";
import { usePlacesWidget } from 'react-google-autocomplete';
import Items from "./Items";
import { Clusterer, Cluster, ClusterIcon   } from "@react-google-maps/marker-clusterer";
import { Dialog } from "primereact/dialog";
import * as png1 from '../../assets/images/1.png'
import axios from "axios";
import polygonicon from '../../assets/icons/mobirise21e04.svg'
import markererpng from '../../assets/images/markererpng.png'
import clustermarkerpng from '../../assets/images/clustermarker1.png'
import chatpng from '../../assets/images/chat.png'
import sharepng from '../../assets/images/shareicon.png'
import imagespng from '../../assets/images/imagesicon.png'
import markericon from '../../assets/images/marker.svg'
import worldmap from '../../assets/images/worldmap.svg'
import loadersvg from '../../assets/images/loader.svg'
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
import silverMapStyle from './silverMapStyle.json';
import { WindPowerSharp, ZoomIn } from "@mui/icons-material";
import { Shows } from "./data";
import { CitiesGeoData } from "./cities";
import { usaCities } from "./usacities";
import { text } from "d3";
import { InputText } from "primereact/inputtext";
import { Dock } from "primereact/dock";
import { set } from "lodash";

const libraries = ['drawing', 'places', 'geometry']

const Map = () => {

  // dom manipulation of element with class name of "App"
  const elementapp = document.getElementsByClassName("cluster");
  console.log(elementapp)


  const jsonData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "areaname": "Reddy Vari Palem",
          "areacost": "3500"
        },
        "geometry": {
          "coordinates": [
            [
              [
                78.00920693070373,
                14.908914077488575
              ],
              [
                78.00888026128342,
                14.907651384017456
              ],
              [
                78.00804873912125,
                14.90650347443389
              ],
              [
                78.0104245167251,
                14.905986913123172
              ],
              [
                78.01140452498589,
                14.90667566126146
              ],
              [
                78.01137482776653,
                14.908110546136811
              ],
              [
                78.00920693070373,
                14.908914077488575
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 0
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Krishnapuram 3rd Road Area",
          "areacost": "2500"
        },
        "geometry": {
          "coordinates": [
            [
              [
                78.00550971829915,
                14.904677090877001
              ],
              [
                78.00374467011761,
                14.90280897536229
              ],
              [
                78.01178544516324,
                14.901130364985107
              ],
              [
                78.01130916232142,
                14.906247378333845
              ],
              [
                78.0106647796515,
                14.905841270607127
              ],
              [
                78.00780708259703,
                14.906355673598313
              ],
              [
                78.00550971829915,
                14.904677090877001
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 1
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Bus stand & Weavers Colonypalle colony",
          "areacost": 2500
        },
        "geometry": {
          "coordinates": [
            [
              [
                78.01160785079963,
                14.9080037906879
              ],
              [
                78.01160785079963,
                14.90423798222345
              ],
              [
                78.01247383883066,
                14.898937843894032
              ],
              [
                78.01281061195374,
                14.897450062316551
              ],
              [
                78.01771787746577,
                14.896985128466483
              ],
              [
                78.02305813699394,
                14.893916539882312
              ],
              [
                78.02849461741386,
                14.897171102127203
              ],
              [
                78.01997906843701,
                14.90400552275149
              ],
              [
                78.01699622077308,
                14.906376597583332
              ],
              [
                78.01160785079963,
                14.9080037906879
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 2
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Vijayanagar",
          "areacost": 2500
        },
        "geometry": {
          "coordinates": [
            [
              [
                77.99911155784429,
                14.909704583875751
              ],
              [
                77.99904956301299,
                14.907847439570503
              ],
              [
                77.99613580588408,
                14.904133102884032
              ],
              [
                77.99743769736614,
                14.90305473506676
              ],
              [
                77.99842961468676,
                14.901556993026759
              ],
              [
                78.00103339765423,
                14.900718252933189
              ],
              [
                78.00698490157623,
                14.905990279239333
              ],
              [
                78.00853477239014,
                14.907308265641689
              ],
              [
                78.00896873621753,
                14.908985691207093
              ],
              [
                78.00283124779656,
                14.910483381557114
              ],
              [
                77.99911155784429,
                14.909704583875751
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 3
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Sunkulammapalem & area",
          "areacost": 2000
        },
        "geometry": {
          "coordinates": [
            [
              [
                78.0015913511458,
                14.912759850922697
              ],
              [
                78.001777335643,
                14.910782918375702
              ],
              [
                78.00289324262957,
                14.911142362008164
              ],
              [
                78.0160361471261,
                14.907248357343477
              ],
              [
                78.01622213162324,
                14.910243751801644
              ],
              [
                78.01504422980548,
                14.912699944143128
              ],
              [
                78.01510622463849,
                14.916234415619016
              ],
              [
                78.00996065353809,
                14.91605469813139
              ],
              [
                78.00710889124218,
                14.914736765303687
              ],
              [
                78.00419513411327,
                14.913957983019515
              ],
              [
                78.0015913511458,
                14.912759850922697
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 4
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Sanjeeva Nagar",
          "areacost": 1800
        },
        "geometry": {
          "coordinates": [
            [
              [
                77.98388578498839,
                14.90891740500922
              ],
              [
                77.98120600157574,
                14.904359711243174
              ],
              [
                77.98013408821242,
                14.903945370660708
              ],
              [
                77.99074603052134,
                14.898455282663988
              ],
              [
                77.99160356121308,
                14.898455282663988
              ],
              [
                77.99803504140016,
                14.896694281393195
              ],
              [
                78.00071482481133,
                14.900319856548748
              ],
              [
                77.99760627605428,
                14.90166648320276
              ],
              [
                77.99610559734367,
                14.903945370660708
              ],
              [
                77.99857099808327,
                14.90767440718993
              ],
              [
                77.9987853807562,
                14.909746066232742
              ],
              [
                77.98388578498839,
                14.90891740500922
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 5
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Sreeniivasapuram",
          "areacost": 2000
        },
        "geometry": {
          "coordinates": [
            [
              [
                78.00111272106903,
                14.910857466460428
              ],
              [
                78.00120197468249,
                14.912453052353754
              ],
              [
                77.99022378030202,
                14.912625547417264
              ],
              [
                77.98801620451394,
                14.910335506534068
              ],
              [
                77.98918289614022,
                14.909852330814047
              ],
              [
                78.00111272106903,
                14.910857466460428
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 6
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Krishnapuram",
          "areacost": 1600
        },
        "geometry": {
          "coordinates": [
            [
              [
                78.00385363602004,
                14.902742260060378
              ],
              [
                77.9985972003218,
                14.89699418206935
              ],
              [
                77.99866636394808,
                14.893986405700588
              ],
              [
                78.0018478908201,
                14.892783283394706
              ],
              [
                78.00461443592542,
                14.894387444976402
              ],
              [
                78.00662018112536,
                14.893652205734227
              ],
              [
                78.01422818016391,
                14.887837043327707
              ],
              [
                78.01291407123944,
                14.896860504012395
              ],
              [
                78.0115999623149,
                14.901071322974715
              ],
              [
                78.00385363602004,
                14.902742260060378
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 7
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Gandlapadu, Challavaripalle",
          "areacost": 400
        },
        "geometry": {
          "coordinates": [
            [
              [
                77.99861260048726,
                14.893519125883714
              ],
              [
                77.9945718256489,
                14.873976934725846
              ],
              [
                77.98320529853925,
                14.83960878199899
              ],
              [
                77.96600978316923,
                14.818759862969912
              ],
              [
                77.98320529853925,
                14.812279384519726
              ],
              [
                77.99486327506202,
                14.818759862969912
              ],
              [
                78.01380748691281,
                14.820168636976376
              ],
              [
                78.03479184465334,
                14.815660527899155
              ],
              [
                78.03974648467641,
                14.820168636976376
              ],
              [
                78.03741488937146,
                14.828621088522866
              ],
              [
                78.03012865404548,
                14.847215319709335
              ],
              [
                78.0264304277847,
                14.853896438021408
              ],
              [
                78.02134959543389,
                14.861374189046401
              ],
              [
                78.01796723254881,
                14.872634542555275
              ],
              [
                78.01693373277902,
                14.877810475662272
              ],
              [
                78.01627605110627,
                14.882169059831625
              ],
              [
                78.01449091513985,
                14.885074733662492
              ],
              [
                78.0143030060907,
                14.886981560828204
              ],
              [
                78.00641082602704,
                14.8933375295328
              ],
              [
                78.0046256900593,
                14.893882318126288
              ],
              [
                78.00133728169948,
                14.892338746867281
              ],
              [
                77.99861260048726,
                14.893519125883714
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 8
      },
      {
        "type": "Feature",
        "properties": {
          "areaname": "Vanganur, Bondaladinne, Tadipatri Outskirts, Vanganur, BDN",
          "areacost": 300
        },
        "geometry": {
          "coordinates": [
            [
              [
                78.01413282594456,
                14.896847184806319
              ],
              [
                78.01490201649409,
                14.887183571081152
              ],
              [
                78.02144013616345,
                14.862650913868777
              ],
              [
                78.0425928762719,
                14.815436293847398
              ],
              [
                78.03990070934856,
                14.806140863827778
              ],
              [
                78.04490044792038,
                14.789408085383087
              ],
              [
                78.05759209198436,
                14.794242131744184
              ],
              [
                78.06874535495069,
                14.790895495733764
              ],
              [
                78.0733604982463,
                14.798332394535024
              ],
              [
                78.0806678084652,
                14.793126592143011
              ],
              [
                78.08259078483894,
                14.821385159753078
              ],
              [
                78.11129064899478,
                14.79803698207462
              ],
              [
                78.12371013447785,
                14.807925333552433
              ],
              [
                78.15658524310794,
                14.773314131492384
              ],
              [
                78.19895760534251,
                14.794505318698782
              ],
              [
                78.15731580107763,
                14.822757014817427
              ],
              [
                78.14635737414653,
                14.835469091288232
              ],
              [
                78.11285175469561,
                14.839285916143183
              ],
              [
                78.08582110982172,
                14.856233869536638
              ],
              [
                78.05805990697797,
                14.87247441048035
              ],
              [
                78.03102926210403,
                14.897185931275033
              ],
              [
                78.01413282594456,
                14.896847184806319
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 9
      }
    ]
  }

  const [defaultCenter, setDefaultCenter] = useState({ lat: 52.52047739093263, lng: 13.36653284549709 })
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
  const markers = [
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
  const [searchBox, setSearchBox] = useState(null);
  const [clickedPolygon, setClickedPolygon] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [wholeClusterMarkers, setWholeClusterMarkers] = useState([])
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [isInfoWindowOpenMarkerer, setIsInfoWindowOpenMarkerer] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null);
  const [drawnCoordinates, setDrawnCoordinates] = useState([]);
  const [visible, setVisible] = useState(true);
  const [showData, setShowData] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [mapPlace, setMapPlace] = useState(null);
  const [polygons, setPolygons] = useState(initialPolygons);
  const [zoom, setZoom] = useState(10);
  const [data, setData] = useState([]);
  const [searchPath, setSearchPath] = useState([]);
  const [searchCenter, setSearchCenter] = useState({ lat: 14.910020, lng: 78.004598 });
  const [polygonColor, setPolygonColor] = useState(["red"]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [visibleMarkersData, setVisibleMarkersData] = useState([]);
  const [progressBar, setProgressBar] = useState(0);

  const mapCenter = useMemo(() => defaultCenter, [searchCenter]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const markerClustererRef = useRef(null);
  const markerClusterRef = React.createRef();
  const inputRef = useRef(null);
  const mapRef = useRef(null);



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

  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];

  useEffect(() => {
    ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
  }, []);


  useEffect(() => {

    // Set a timeout to display the data after 10 seconds
    const timer = setTimeout(() => {
      setShowData(true);

      // Get a reference to the cluster div elements
      // Manipulate a dom element with class name of "cluster" here

    }, 3000); // 10000 milliseconds (10 seconds)

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handlePolygonClick = (polygon) => {
    setSelectedArea(polygon);
  };

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
      <div style={{ borderColor: 'grey' }}>
        {/* <img src="" className="item-image" /> */}
        <div className="item-details">
          <h2 className="item-title">{item.location}</h2>
          <p className="item-description">{item.lat}</p>
          <p className="item-description">{item.lng}</p>
        </div>
        <p>{item.title}</p>
      </div>
    );
  };

  // Memoize the map center coordinates to prevent unnecessary re-renders

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

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
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

  useEffect(() => {
    // This effect will be called whenever the bounds of the map change
    // and the MarkerClusterer component will update clusters accordingly.
    // We can use this effect to access the elements of all visible clusters.
    if (window.google) {
      const handleBoundsChanged = () => {
        if (markerClustererRef) {
          // Get the MarkerClusterer instance from the window object
          const markerClusterer = markerClustererRef;

          // Get all visible clusters
          const visibleClusters = markerClusterer.getClusters();
          console.log(visibleClusters);

          // Iterate through clusters and get marker data
          const allVisibleMarkersData = visibleClusters.reduce((accumulator, cluster) => {
            // Get all markers in the current cluster
            const markers = cluster.getMarkers();

            // Extract data from markers and add to accumulator
            const markersData = markers.map(marker => ({
              id: marker.id,
              lat: marker.getPosition().lat(),
              lng: marker.getPosition().lng(),
              title: marker.title,
            }));

            return [...accumulator, ...markersData];
          }, []);

          // Update state with the data of all visible markers
          setVisibleMarkersData(allVisibleMarkersData);
        }
      };

      // Add a bounds changed event listener to the map
      if (window.google.maps.event) {
        window.google.maps.event.addListener(mapRef, 'bounds_changed', handleBoundsChanged);
      }

      // Clean up the event listener when the component unmounts
      return () => {
        if (window.google.maps.event) {
          window.google.maps.event.clearListeners(mapRef, 'bounds_changed');
        }
      };
    }
  }, []);

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

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

  function getVisibleMarkersData() {
    if (markerClusterRef.current) {
      // Get the visible markers from the cluster
      const visibleMarkers = markerClusterRef.current.getMarkers();

      visibleMarkers.forEach((marker) => {
        console.log('Marker ID:', marker.id);
        console.log('Latitude:', marker.getPosition().lat());
        console.log('Longitude:', marker.getPosition().lng());
        console.log('Title:', marker.title);
      });

      // Extract and display data from visible markers
      visibleMarkers.forEach((marker) => {
        const position = marker.getPosition();
        const title = marker.getTitle();

        // You can access other marker properties as needed
        console.log(`Marker at ${position.lat()}, ${position.lng()}: ${title}`);
      });
    }
  }

  const handleBoundsChanged = () => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      const visibleMarkers = Shows.filter(marker => {
        const markerPosition = new window.google.maps.LatLng(marker.lat, marker.lng);
        return bounds.contains(markerPosition);
      });
      console.log(visibleMarkers)
      setVisibleMarkersData(visibleMarkers);
    }
  };


  const onLoadMap = (map) => {
    setMapPlace(map);
    mapRef.current = map;
    mapRef.current.addListener('bounds_changed', handleBoundsChanged);

  };

  const getLocationPolygon = useCallback(async (txtSearch) => {
    let addOns = txtSearch.replace(" ", "+");
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?q=${addOns || ""
      }&polygon_geojson=1&format=json`
    );
    const respData = response?.data[0]?.geojson?.coordinates[0];
    const resp =
      respData.length > 10
        ? respData
        : !respData.length
          ? response?.data[0]?.geojson?.coordinates
          : respData[0].length > 10
            ? respData[0]
            : response?.data[0]?.geojson?.coordinates;
    const mapLat =
      (await resp.length) > 10
        ? resp?.map((value) => value[1])?.reduce((a, b) => a + b, 0) /
        resp.length
        : resp[1];
    const mapLng =
      (await resp.length) > 10
        ? resp?.map((value) => value[0])?.reduce((a, b) => a + b, 0) /
        resp.length
        : resp[0];
    if (resp) {
      const setFormat =
        resp.length > 10
          ? resp.map((value, index) => {
            return { lat: value[1], lng: value[0] };
          })
          : [{ lat: resp[1], lng: resp[0] }];
      setZoom(
        setFormat.length > 50 && setFormat.length <= 100
          ? 12
          : setFormat.length > 100 && setFormat.length <= 200
            ? 11
            : setFormat.length > 200
              ? 10
              : 13
      );
      var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setPolygonColor((prev) => [...prev, randomColor]);
      setSearchCenter({ lat: mapLat, lng: mapLng });
      setSearchPath((prev) => [...prev, setFormat]);
      inputRef.current.value = "";
    }
  }, []);


  const onPlacesChanged = () => console.log(searchBox.getPlaces());
  const onSBLoad = ref => {
    setSearchBox(ref);
  };


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

  const [isCardVisible, setIsCardVisible] = useState(true);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  function handleClusterClick(cluster, allMarkers) {
    // Get the markers in the clicked cluster
    const clusterMarkers = cluster.getMarkers();
    setWholeClusterMarkers(clusterMarkers)

    clusterMarkers.forEach((marker) => {
      console.log('Longitude:', marker.getPosition().lng());
      console.log('Title:', marker.label.text);
    });


    // Log or process the clusterMarkers data as needed
    console.log('Clicked Cluster Markers:', clusterMarkers);
  }

  const [panelVisibleChat, setPanelVisibleChat] = useState(false);

  const [positionDock, setPositionDock] = useState('right');
  const itemsDock = [
    {
      label: 'Chat',
      icon: () => <img alt="chat" src={chatpng} width="30px" />,
      command: () => {
        setPanelVisibleChat(!panelVisibleChat);
      }
    },
    {
      label: 'Details',
      icon: () => <img alt="Details" src={sharepng} width="30px" />,
      command: () => {
        setPanelVisibleChat(!panelVisibleChat);
      }
    },
    {
      label: 'Photos',
      icon: () => <img alt="Photos" src={imagespng} width="30px" />,
      command: () => {
        setPanelVisibleChat(!panelVisibleChat);
      }
    }
  ];

  const handleDockItemClick = (event) => {
    console.log(event)
    const clickedItem = event.item; // The clicked item object
    console.log(`Clicked on ${clickedItem}`);

    // Perform your desired action based on the clicked item
    // For example, you can show/hide a panel, change content, etc.
  };

  const createClusterIcon = (markers, numStyles) => {
    const index = Math.min(markers.length, numStyles);
    const iconSize = markers.length < 50 ? 30 : markers.length <100 ? 40 : markers.length <250 ? 50 : 60 ; // Change the icon size based on the marker count
    return {
      text: markers.length.toString(),
      index,
      title: 'Cluster',
      height: iconSize,
      width: iconSize,
    };

  };

  const clusterStyle = (cluster) => {
    const markersCount= cluster.getMarkers().length; // Get the marker count in the cluster
    let styles = {
      // Define your default cluster styles here
      // For example, you can set the background color and font size
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      fontSize: "16px",
      url: markererpng, // Customize the cluster icon
      height: markersCount.length < 50 ? 30 : markersCount.length <100 ? 40 : markersCount.length <250 ? 50 : 60 ,
      width: markersCount.length < 50 ? 30 : markersCount.length <100 ? 40 : markersCount.length <250 ? 50 : 60 ,
      anchorText: [0, 0],
    };

    // Customize the style based on the marker count
    if (markersCount > 10) {
      styles.backgroundColor = "rgba(0, 255, 0, 0.5)"; // Change background color for clusters with more than 10 markers
    }

    return styles;
  };
  
  

  return (
    <div className="App">
      {/* <div className="App-header">
        
      </div> */}

      <LoadScript
        id="script-loader"
        // googleMapsApiKey="AIzaSyDfnY7GcBdHHFQTxRCSJGR-AGUEUnMBfqo"
        googleMapsApiKey="AIzaSyAL0MuUIdL72AekYnnAYA9PGzbAPMXfcyE"
        // googleMapsApiKey="AIzaSyD0zXKRP7yPgqLfV-fM1XP8kKGrMZ0qNvk"
        // googleMapsApiKey="AIzaSyAW-yfggxPKG70-wGj_e634dgadcJZfe-I"
        // googleMapsApiKey="AIzaSyB-5Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z"
        // googleMapsApiKey="AIzaSyCevbVduZFUAeWexDAe7rvUAxLu4xaLkVE"
        // googleMapsApiKey="AIzaSyDyg3wITfkdePL5z451280VRHGu8aZNKao
        // googleMapsApiKey="AIzaSyAVKexP11sRInvO7NdRGmfo71YkXvztty4"
        // googleMapsApiKey="AIzaSyDfnY7GcBdHHFQTxRCSJGR-AGUEUnMBfqo"
        // googleMapsApiKey="AIzaSyAqBYJ63aDxGZcUb2ksU139l1llXBQhBh8"
        // googleMapsApiKey=""
        language="en"
        region="in"
        libraries={libraries}
      >
        {showData ?
          <GoogleMap
            mapContainerClassName="App-map"
            center={searchCenter}
            zoom={2}
            ref={mapRef}
            version="weekly"
            on
            onLoad={onLoadMap}
            zoomControl={true}
            // onLoad={onLoadMap}
            options={{
              // styles: customMapStyle,
              disableDefaultUI: true,
              zoomControl: true,
              styles: silverMapStyle,
              mapTypeId: 'terrain',
              
              // Apply the custom map style here
            }}
          >
            {searchPath.map((p, i) => (
              <Polygon
                // Make the Polygon editable / draggable
                // editable
                // draggable
                options={{
                  fillColor: polygonColor[i],
                  strokeColor: polygonColor[i],
                  fillOpacity: 0.5,
                  strokeWeight: 2
                }}
                path={p}
                // Event used when manipulating and adding points
                onMouseUp={onEdit}
                // Event used when dragging the whole Polygon
                onDragEnd={onEdit}
                onLoad={onLoad}
                onUnmount={onUnmount}
              />
            ))}

            {showData && polygons.map((polygon) => (
              <Polygon
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
                onClick={(e) => {
                  // Set the clicked polygon and its position
                  if (zoom <= 10) {
                    setClickedPolygon(polygon);
                  }
                  else {
                    setZoom(13)
                  }
                  setClickedPosition(e.latLng);
                }}
                styles={[{
                  url: markererpng, // Customize the cluster icon
                  height: 60,
                  width: 60,
                  anchorText: [0, 0], // Position of the text inside the cluster icon
                }]}
                options={{
                  fillColor: "blue",
                  strokeColor: "blue",
                  fillOpacity: 0.2,
                  strokeWeight: 1,
                  icon: {
                    url: polygonicon, // URL to your custom icon image
                    scaledSize: new google.maps.Size(30, 30), // Adjust the size as needed
                  },
                }}
              />
            ))
            }

            {clickedPolygon && (
              <InfoWindow
                position={clickedPosition}
                onCloseClick={() => {
                  // Close the info window when the close button is clicked
                  setClickedPolygon(null);
                }}
              >
                <div>
                  {/* Render the label or popup content here */}
                  <h2>Cost : {clickedPolygon.id}</h2>
                  <p>Additional information</p>
                </div>
              </InfoWindow>
            )}

            {showData &&
              <MarkerClusterer
                averageCenter
                enableRetinaIcons
                gridSize={50}
                zoomOnClick={true}
                options={{
                  minimumClusterSize: 2,
                }}
                // title="Hello all"
                styles={[{
                  url: clustermarkerpng, // Customize the cluster icon
                  height: 60 ,
                  width: 60 ,
                  anchorText: [-10, 0], // Position of the text inside the cluster icon
                },
                // {
                //   url: chatpng, // Customize the cluster icon
                //   height: 50 ,
                //   width: 50 ,
                //   anchorText: [-20, 8],
                // }
              ]}
                
                label={{ text: "Hello all", color: "blue", fontSize: "10px", fontWeight: "bold" }}
                ref={markerClustererRef}
                onClick={(cluster) => handleClusterClick(cluster, Shows)}
                calculator={createClusterIcon}
              // onMouseOver={handleMarkererOver}
              >
                {(clusterer) =>
                  Shows.map((marker, index) => (

                    <Marker
                      key={index}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      icon={{
                        url: markericon, // URL to your custom icon image
                        scaledSize: new google.maps.Size(50, 50),
                      }}
                      title={JSON.stringify(marker)}
                      label={{ text: marker.title.toString(), color: "blue", fontSize: "10px", fontWeight: "bold", fontFamily: 'sans-serif' }}
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
                  position={searchCenter}
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

            <div>
              <Dock model={itemsDock} position={positionDock} onClick={handleDockItemClick} style={{ transitionDuration: 0.3, transition: 'ease-in-out' }} />
            </div>

            <Button style={{ position: 'absolute', zIndex: '1', top: '20px', left: '20px', backgroundColor: 'Skyblue', padding: '7px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }} label={isCardVisible ? 'X' : '='} onClick={toggleCardVisibility} />
            {isCardVisible && <Card className="md:w-25rem" style={{
              position: 'absolute',
              top: '20px', // Adjust the top position as needed
              left: '20px', // Adjust the left position as needed
              bottom: '20px',
              backgroundColor: 'white',
              padding: '2px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
            }}>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon" style={{ height: '37px', borderRadius: '10px' }}><i className="pi pi-map" /></span>
                <InputText ref={inputRef}
                  onInput={(e) => setData(e.target.value)}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    height: '37px',
                    width: '200px',
                  }}
                  placeholder={"Search a Place"}
                  type="text"
                  name="name" />
                <Button
                  style={{ padding: 10, marginLeft: '10px', cursor: "pointer", height: '37px', background: 'white', borderColor: 'black', borderRadius: '20px' }}
                  onClick={() => getLocationPolygon(data)}
                >
                  <img src={worldmap} alt="World Map" width="60px" height="35px" style={{ borderRadius: '10px' }} />
                </Button>
              </div>

              <TabView>
                <TabPanel header="Clusters">
                  <DataScroller style={{ borderRadius: '10px', borderColor: 'grey' }} value={visibleMarkersData} sortField={sortField} sortOrder={sortOrder} itemTemplate={itemTemplate} rows={visibleMarkersData.length} inline scrollHeight={300} lazy={true} />
                </TabPanel>
                <TabPanel header="Developers">
                  Content II
                </TabPanel>
                <TabPanel header="Locations">
                  <div>
                    <h3>Geofences</h3>
                    <ul className="list-group list-group-flush">
                    </ul>
                    <div>
                      <button
                        className="m-2 btn btn-dark mx-auto d-block w-100"
                      >
                        + Ajouter
                      </button>
                    </div>
                    <h3 className="mt-4 mb-2">MultiPolygon (GeoJSON)</h3>
                    <p>{JSON.stringify(visibleMarkersData, null, 2)}</p>

                  </div>
                </TabPanel>
              </TabView>
            </Card>}

            {panelVisibleChat && (
              <div className="panel" style={{
                position: 'absolute', bottom: 0, right: 0, animation: "step-start",
                backgroundColor: 'blue',
                cursor: 'pointer',
                transition: 'transform 0.5s ease-in-out',
                transform: 'translateX(0)'
                , zIndex : 1
              }}>
                <Card title="Chat" className="md:w-25rem" style={{ zIndex : 5 }}>
                  <p className="m-0" style={{ zIndex : 5 }}>
                    Sample content
                  </p>
                </Card>
              </div>
            )}

            <StandaloneSearchBox
              onLoad={onSBLoad}
              onPlacesChanged={onPlacesChanged}
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
            </StandaloneSearchBox>

            {CitiesGeoData.map((feature) => (
              <Polygon
                key={feature.id}
                paths={feature.geometry.coordinates[0].map((coord) => ({ lat: coord[1], lng: coord[0] }))}
                onClick={() => handlePolygonClick(feature)}
                // Change color according to properties.areacost
                options={{
                  fillColor: feature.properties.areacost > 2200 ? 'red' : feature.properties.areacost > 1500 ? 'blue' : 'green',
                  strokeColor: feature.properties.areacost > 2200 ? 'red' : feature.properties.areacost > 1500 ? 'blue' : 'green',
                  fillOpacity: 0.4,
                  strokeWeight: 0.5,
                  strokeOpacity: 0.8,
                }}

              />
            ))}

            {selectedArea && (
              <InfoWindow
                //find the center of the polygon of selectedArea.geometry.coordinates[0]
                position={{
                  lat: selectedArea.geometry.coordinates[0].map((coord) => coord[1]).reduce((a, b) => a + b, 0) / selectedArea.geometry.coordinates[0].length,
                  lng: selectedArea.geometry.coordinates[0].map((coord) => coord[0]).reduce((a, b) => a + b, 0) / selectedArea.geometry.coordinates[0].length
                }}

                onCloseClick={() => setSelectedArea(null)}
                onMouseOut={() => setSelectedArea(null)}
                visible={selectedArea !== null}
                zIndex={1}

              >
                <div className="info-window">
                  <h2>{selectedArea.properties.areaname}</h2>
                  <p>Area Cost: {selectedArea.properties.areacost} per Sq.ft</p>
                </div>
              </InfoWindow>
            )}

            {/* <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={50}
            zoomOnClick={true}
            options={{
              minimumClusterSize: 2,
            }}>

            {(clusterers) => usaCities.features.map((city) => (
              <Marker
                key={city.id}
                position={{
                  lat: city.geometry.coordinates[1],
                  lng: city.geometry.coordinates[0],
                }}
                clusterer={clusterers}
              />
            ))}
          </MarkerClusterer> */}
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
        

          </GoogleMap> : <div className="progress-bar-container" style={{marginTop: "25%", }}>
              <Iconify icon="svg-spinners:bars-scale"  />
          </div>
        }
      </LoadScript>
    </div>
  );
}

export default Map;