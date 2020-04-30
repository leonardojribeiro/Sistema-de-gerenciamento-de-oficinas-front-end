import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export function MapContainer({ initialCenter, onClick, icone, ...props }) {
  return (
    <Map
      containerStyle={{
        position: 'relative',
        maxWidth: "100%",
        height: '400px'
      }}
      google={props.google}
      zoom={4}
      initialCenter={initialCenter}
      center={initialCenter}
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
  apiKey: ("AIzaSyBXHu_yyh-66CMPcXRl_73eRsGdZuiUaso"),
  language: "pt",
  region: "br",
})(MapContainer)