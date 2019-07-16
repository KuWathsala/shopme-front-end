import React from 'react';
import {Redirect,Link,withRouter} from 'react-router-dom';
//import browserHistory from 'react-router-dom';
//import { RedirectWithoutLastLocation } from 'react-router-last-location';
import axios from 'axios';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';

Geocode.setApiKey("AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM");
Geocode.enableDebug();

class Map extends React.Component{

state = {
   address: '',
  }
 
 
/**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
  Geocode.fromLatLng( this.props.center.lat , this.props.center.lng ).then(
   response => {
    const address = response.results[0].formatted_address;
    this.props.onsetLocation(this.props.center.lat , this.props.center.lng,address );
    this.setState( {
     address: ( address ) ? address : '',
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
  if (
    this.props.latitude !== this.props.center.lat ||
   this.state.address !== nextState.address
  ) {
   return true
  } else if ( this.props.latitude === nextProps.center.lat ){
   return false
  }
 }
 onChange = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };
/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
};
/**
  * When the user types an address in the search box
  * @param place
  */
 onPlaceSelected = ( place ) => {
const address = place.formatted_address,
   latValue = place.geometry.location.lat(),
   lngValue = place.geometry.location.lng();
   this.props.onsetLocation(latValue,lngValue,address);
// Set these values in the state.
  this.setState({
   address: ( address ) ? address : '',
  })
 };
/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();


Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address;
    this.props.onsetLocation(newLat,newLng,address);
    

this.setState( {
     address: ( address ) ? address : '',  
    } )

   },
   error => {
    console.error(error);
   }
  );
 };

setLocation=()=>{
    axios.post('',this.props)
        .then(response=>{
            console.log(response);
        });
    this.props.onSubmit(true);
    this.try2();
      }

try2=()=>{this.props.history.goBack();  
        //browserHistory.goBack;
       
    } 
render(){
  
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap google={this.props.google}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
     >
      {/* For Auto complete Search Box */}
      <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '5px',
        marginBottom: '5px'
       }}
       onPlaceSelected={ this.onPlaceSelected }
       types={["geocode"]}
      />
      <div style={{float:'right'}}><input type="button" name="submit" value="Select Location" onClick={this.setLocation}/></div>
      
{/*Marker*/}
      <Marker google={this.props.google}
       name={'Dolores park'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
          position={{ lat: this.props.latitude, lng: this.props.longitude}}
      />
      <Marker />
{/* InfoWindow on top of marker */}
      <InfoWindow
       onClose={this.onInfoWindowClose}
       position={{ lat: ( this.props.latitude + 0.0018 ), lng: this.props.longitude }}
      >
       <div>
        <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
       </div>
      </InfoWindow>
</GoogleMap>
)
   )
  );
  return(
  
  <div style={{height:'500px'}}>
    
     <div>
     <b>Drag marker to set the Exact location</b>
      <div className="form-group">        
       <label htmlFor="">Address</label>
       <input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
      </div>
     </div>
     <AsyncMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM&libraries=places"
      loadingElement={
       <div style={{ height: '100%' }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: '100%' }} />
      }
     />
     </div>);
 
 };
 
}
const mapStateToProps=state=>{
  return{
    latitude:state.location.latValue,
    longitude:state.location.lngValue,
    isLocationSet:state.location.submit
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onsetLocation:(lat,lng,address)=>dispatch(actions.location(lat,lng,address)),
    onSubmit:(submit)=>dispatch(actions.submission(submit))
  };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Map));