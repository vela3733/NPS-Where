import React, {useState} from 'react'
import {connect} from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import StateForm from './stateForm'




export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedParks: [],
      randomParkDisplay: [],
      parks: [],
    }
    this.LocationMarker = this.LocationMarker.bind(this)
  }

  async componentDidMount() {
    const apiKey = 'Er1RUGUH01srZtUNWR7TXeOHxBSMOCKmXaKNLcOQ'
      //fetch default parks
      const response = await fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&limit=465`);
      const  {data: npsData} = await response.json();
      console.log('didmount', npsData);
      const newArray = []
      for(let i = 0; i < 4; i++) {
        newArray.push(npsData[Math.floor(Math.random()*npsData.length)])
      };
      this.setState({
        randomParkDisplay: newArray,
        parks: npsData
      }) 
  }


  LocationMarker = () => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, 6)
      },
    })
    const personIcon = L.icon({
      iconUrl: 'person-Icon.png',
      iconSize: [50, 32], //numbers for a proportional size
      iconAnchor: [25, 16], //center with these numbers
     
    });

    return position === null ? null : (
      <Marker position={position} icon={personIcon} style="hieght:10px; width:10px;">
        <Popup>You are here</Popup>
      </Marker>
    )
  }


  render() {
    const {username} = this.props
    const parks = this.state.parks
    const parksDisplay = this.state.randomParkDisplay

    console.log('sttateeeee', this.state)
    console.log('rendering', parks)
    parks === [] ? console.log('sorry') : console.log('aprks.length',parks.length)

    return (
      <>
        <div className="text" align="center">
          {
            username ?  <div><h3>Huzzzah! {username}.</h3><h4>Let's find your next adventure</h4></div> : <h4>Hiya! Signup or login to save your most rad spots.</h4>
          }
        </div>
        <div className="text" align="center">  
          <h3>first we ask, 'hmm where are you?'<span>(click anywhere in the map and let's see.)</span></h3>
          <p>
            latitude: <span id="lat"></span>??<br />
            longitude: <span id="long"></span>??<br />
          </p>
        </div>
        <div>
          <StateForm /> 
        </div>

        <div id="map">
          <MapContainer center={[51.505, -0.09]} zoom={4} style={{ height: "100vh", width: "100%" }} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <this.LocationMarker />
            {
              parks.map(park => { 
                const {latitude, longitude, fullName, states, url, images} = park;
                return(
                  <Marker position={[latitude, longitude]} key={park.id} >
                    <Popup  className="popupContainer">
                      <img src={images[0].url} /> <br />{fullName} <br /> {states} <br/ > <a href={url} >Park Website</a>
                    </Popup>
                  </Marker>
                )
              })
            }
          </MapContainer>
        </div>
        <br />
        <div id="title" className="text">Check out these fun NationalParks!</div>
        <br />
        <div className="parksDisplayContainer">
          {
            parksDisplay === [] ? <h2>no displayed parks</h2> :
            parksDisplay.map(park => 
              <div className="parkDisplay" key={park.id}>
                <img src={park.images[0].url} />
                <h3>{park.fullName}</h3>
                <h3>{park.states}</h3>
                <p>{park.description}</p>
              </div>
              )
          }
        </div>
        <br />
        <footer>technologies/libraries used: Leaflet, React-Leaflet, React</footer>
      </>
    );
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
