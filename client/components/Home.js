import React, {useState} from 'react'
import {connect} from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { render } from 'enzyme';


/**
 * COMPONENT
 * 
 */
//my NPS api key
 //const apiKey = Er1RUGUH01srZtUNWR7TXeOHxBSMOCKmXaKNLcOQ


export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parks: [],
    }

    this.LocationMarker = this.LocationMarker.bind(this)
    // this.ParkLocationsMarker = this.ParkLocationsMarker.bind(this)

  }

  
  

  async componentDidMount() {
    const apiKey = 'Er1RUGUH01srZtUNWR7TXeOHxBSMOCKmXaKNLcOQ'
      //fetch default parks
      const response = await fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&limit=400`)
      const  {data: npsData} = await response.json()
      console.log('didmount', npsData)
      this.setState({parks: npsData })
          // const newArray = []
          // for(let i = 0; i < 4; i++) {
          //     newArray.push(json.data[Math.floor(Math.random()*json.data.length)])
          // }
          // this.setState({
          // defaultParks: newArray,
          // })

      
  }

  // const [hikingData, setHikingData] = useState(0);


  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  // const requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow'
  // };

  // fetch("https://www.benbrougher.tech/hiker/v1/trails/", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));



    // const api_url = 'https://www.benbrougher.tech/hiker/v1/trails/' ;
    // const response = await fetch(api_url, requestOptions);
    // const json = await response.json();
    // console.log(json)




  LocationMarker = () => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  // ParkLocationsMarker = (parks) => {
  //   if(parks == []) {
  //     return (<div>no parks!</div>)
  //   } else {
  //     const parkPositions = parks.map(park => { 
  //       const {latitude, longitude} = park;
  //       return parks === null ? null : (
  //       <Marker position={[latitude, longitude]} >
  //         <Popup>
  //           I.m a park. <br /> Easily customizable.
  //         </Popup>
  //       </Marker>
      
  //   )})}


  //     // <Marker position={[latitude, longitude]} >
  //     //   <Popup>
  //     //     I.m a park. <br /> Easily customizable.
  //     //   </Popup>
  //     // </Marker>
    
  // }




  
  render() {
    const {username} = this.props
    const parks = this.state.parks
    console.log('sttateeeee', this.state)
    console.log('rendering', parks)
    parks === [] ? console.log('sorry') : console.log('aprks.length',parks.length)
    // console.log(Parks)
    return (
      <>
        <div className="text" align="center">
          {
            username ?  
            <h3>Huzzzah! to you, {username}</h3> : <h4>Hiya! Signup or login to save your most rad spots.</h4>

          }
        </div>
        <div className="text">  
        <h3>Where art thou?<span>(click anywhere in the map. Have a few deep blinks. and....)</span></h3>
        <p>
          latitude: <span id="lat"></span>°<br />
          longitude: <span id="long"></span>°<br />
        </p>
        </div>
        <div>
          {
            parks !== [] ? <p className="text">Parks are a go!</p> : <em className="text">no parks found</em>
          }
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
                const {latitude, longitude, fullName, states, url} = park;
                return(
                <Marker position={[latitude, longitude]} key={park.id} >
                  <Popup>
                    {fullName} <br /> {states} <br/ > {url}
                  </Popup>
                </Marker>)
              })
            }
          </MapContainer>
        </div>
        <div className="text">hellllllloooooo</div>
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
