import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export function MapContainer({ initialCenter, onClick, icone, ...props }) {
  return (
    <Map
      containerStyle={{
        position: 'relative',
        maxWidth: "100%",
        height: '372px'
      }}
      google={props.google}
      zoom={3}
      initialCenter={initialCenter}
      streetView={false}
      onClick={onClick}
    >
      <Marker
        position={initialCenter}
        draggable={true}
        onDragend={onClick}
        icon={{
          url: icone ? icone : null, 
          anchor: new props.google.maps.Point(32, 32),
          scaledSize: new props.google.maps.Size(32, 32)
        }}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBXHu_yyh-66CMPcXRl_73eRsGdZuiUaso"),
  language: "pt",
  region: "br",
})(MapContainer)