import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper,} from 'google-maps-react';

export function MapContainer({ initialCenter, onClick, icone, ...props }) {
  return (
    <Map
      containerStyle={{
        position: 'relative',
        maxWidth: "100%",
        height: '372px'
      }}
      
      google={props.google}
      zoom={5}
      initialCenter={initialCenter}
      
      onClick={onClick}
    >
      <Marker
        position={initialCenter}
        icon={{
          url: icone.length ? icone : null,
          anchor: new props.google.maps.Point(32,32),
          scaledSize: new props.google.maps.Size(48,48)
        }}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBXHu_yyh-66CMPcXRl_73eRsGdZuiUaso"),
  language: "pt"
})(MapContainer)