import React from "react";
import { useEffect, useRef, useCallback, useMemo } from "react";
import Layout from "../../components/common/Layout";

const Explore = () => {
  const mapbox = useRef(window.mapboxgl);
  const map = useRef(null);
  const defaultPosition = useRef([4.9041, 52.3676]);

  const data = useMemo(() => {
    return [
      [5.2647, 52.3508],
      [4.8292, 52.442],
      [4.6462, 52.3874],
    ];
  }, []);

  const setupMap = useCallback(() => {
    return new Promise((resolve) => {
      mapbox.current.accessToken =
        "pk.eyJ1Ijoic2hhaGFidnNoYWhhYmkiLCJhIjoiY2p4ZWtiYXl4MG5wNDN2bDczbjA1YnNlMyJ9.SuyPvFN0GNljszTIIwRwsA";
      map.current = new mapbox.current.Map({
        container: "map",
        style: "mapbox://styles/shahabvshahabi/ckxmsxz756qvx14lettj1e2jb",
        center: defaultPosition.current,
        zoom: 15,
        attributionControl: false,
      });
      resolve(true);
    });
  }, []);

  const syncPosition = useCallback(() => {
    if (window && window.navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {
          coords: { longitude, latitude },
        } = position;
        map.current.flyTo({
          center: [longitude, latitude],
        });
      });
    }
  }, []);

  const setupMarkers = useCallback(() => {
    data.forEach((data) => {
      const el = document.createElement("div");
      el.classList.add("marker");
      el.addEventListener("click", () =>
        map.current.flyTo({
          center: data,
        })
      );

      new mapbox.current.Marker(el).setLngLat(data).addTo(map.current);
    });
  }, [data]);

  useEffect(() => {
    setupMap().then(syncPosition).then(setupMarkers);
  }, [syncPosition, setupMap, setupMarkers]);

  return (
    <Layout>
      <div id="map" className="absolute top-0 bottom-0 w-full h-full"></div>
    </Layout>
  );
};

export default Explore;
