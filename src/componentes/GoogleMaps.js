import React, { memo }  from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export function MapContainer({ initialCenter, center, onClick, icone, zoom, ...props }) {

  return (
    <Map
      containerStyle={{
        position: 'absolute',
      }}
      center={center}
      google={props.google}
      zoom={zoom}
      initialCenter={initialCenter}
      streetView={false}
      onClick={onClick}
    >
      <Marker
        position={initialCenter}
        draggable={true}
        onDragend={onClick}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "pt",
  region: "br",
})(memo(MapContainer));