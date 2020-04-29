import React from 'react';
import { Map, Marker, GoogleApiWrapper} from 'google-maps-react';

var geocoder;
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
        
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBXHu_yyh-66CMPcXRl_73eRsGdZuiUaso"),
  language: "pt",
  region: "br",
})(MapContainer)