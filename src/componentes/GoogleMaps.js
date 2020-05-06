import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { memo } from 'react';
import { useMemo } from 'react';

export function MapContainer({ initialCenter, onClick, icone, zoom, ...props }) {


  const marker = useMemo(() => (
    <Marker
      position={initialCenter}
      draggable={true}
      onDragend={onClick}
    />
  ));
  return (
    <Map
      containerStyle={{
        position: 'relative',
        maxWidth: "100%",
        height: '400px'
      }}
      google={props.google}
      zoom={8}
      initialCenter={initialCenter}
      streetView={false}
      onClick={onClick}
    >
      {marker}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBXHu_yyh-66CMPcXRl_73eRsGdZuiUaso"),
  language: "pt",
  region: "br",
})(memo(MapContainer));