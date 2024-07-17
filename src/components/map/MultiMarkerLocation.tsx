import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MultiMarkerLocation = ({ hotelData }: { hotelData: any }) => {
  const [zoom, setZoom] = useState(14);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  });

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: hotelData[0]?.latitude,
      lng: hotelData[0]?.longitude,
    });

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setZoom(13);
    }, 300);
  }, []);

  return isLoaded ? (
    <GoogleMap
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerStyle={containerStyle}
      center={{
        lat: hotelData[0].latitude,
        lng: hotelData[0].longitude,
      }}
    >
      {hotelData?.map((item: any, index: number) => (
        <MarkerF
          key={index}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MultiMarkerLocation;
