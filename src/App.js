import React, {Component} from 'react';
import Venue from './Venue';
import Modal from 'react-bootstrap/Modal'
import logo from './logo.svg';
import './App.css';

var clientId = 'RPGUL25RSMX1OOV0ZFGA3OGD0IF5XKQB0SA4RWEC1VIHWTHF'
var clientSecret = 'QDZM0F0J3HM4UGZBOLCMRJFRUY5VKJXMFPE4FREEOC3KQTD1'
var key = '?client_id='+clientId+'&client_secret='+clientSecret+'&v=20200801'


class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      venues:[
        // {
        //   id: "4b4d4133f964a52070cf26e3", 
        //   name: "Real Groovy", address: "369 Queen Street", 
        //   category: "Record Shop"
        // },
        // {
        //   id: "4b633568f964a520bc6a2ae3", 
        //   name: "Cordis Auckland", address: "83 Symonds St", 
        //   category: "Hotel"
        // },
        // {
        //   id: "4bc992e7b6c49c7401a28e91", 
        //   name: "Ken Yakitori", address: "89 Karangahape Rd.", 
        //   category: "Yakitori"
        // }
      ],
      isModalOpen: false,
      modalVenue:{
        address: "169 Karangahape Rd.",
        category: "Coffee Shop",
        description: "Iconic K Rd cafe /bar open 7 days for breakfast ,lunch and dinner with late night entertainment Wednesday- Saturday.",
        id: "4b5a5f48f964a520ccc028e3",
        name: "Verona Cafe",
        photo: "https://fastly.4sqi.net/img/general/300x300/14834930_ZpkKmLsnmEzETM1usPvNzBP8sat60NWjLwnvq3Uv8UM.jpg"
      }
    }
  }
  loadVenues = ()=>{
    var latlong = '-36.856925,174.764564'
    var url = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll='+latlong

    //make an Ajax request to endpoint
    fetch(url)
    .then(res=>res.json())
    .then(data=>data.response.groups[0].items)
    .then((data)=>{
        return data.map((item)=>{
            var venue = {
                id:item.venue.id,
                name:item.venue.name,
                address:item.venue.location.address,
                category:item.venue.categories[0].shortName
            }
            return venue
        })
    })
    .then((data)=>{
        this.setState({
          venues:data
        })
    })

  }
  loadVenue = (id)=>{
    var url = 'https://api.foursquare.com/v2/venues/'+id+key
   
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        var item = data.response.venue
        var venue = {
            id:item.id,
            name:item.name,
            category:item.categories[0].shortName,
            address:item.location.address,
            description:item.description,
            photo:item.bestPhoto.prefix + '300x300' + item.bestPhoto.suffix
        }
        return venue
    })
    .then(data=>{
      this.setState({
        modalVenue:data
      })
    })
  }
  openModal = ()=>{
    this.setState({
      isModalOpen:true
    })
  }
  closeModal = ()=>{
    this.setState({
      isModalOpen:false
    })
  }
  componentDidMount(){
    this.loadVenues()
  }
  render(){

    return (
      <div className="app">
        <div className="container">
          <div className="venues">
            {
              this.state.venues.map((item)=>{
                var venueProps = {
                  key: item.id,
                  ...item,
                  openModal: this.openModal,
                  loadVenue: this.loadVenue
                }
                return (
                  <Venue {...venueProps}/>
                )
              })
            }
          </div> 

          <div className="venue-filters">
            
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div role="group" className="btn-group btn-group-toggle">
                <label className="venue-filter btn active btn-primary">
                  <input name="venue-filter" type="radio" autocomplete="off" value="all" checked=""/>All
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autocomplete="off" value="food"/>Food
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autocomplete="off" value="drinks"/>Drinks
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autocomplete="off" value="others"/>Others
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <Modal show={this.state.isModalOpen} onHide={this.closeModal}>

          <Modal.Body>
            <div className="venue-popup-body row">
              <div className="col-6">
                <h1 className="venue-name">{this.state.modalVenue.name}</h1>
                <p>5B Gore St</p>
                <p>Auckland</p>
                <p><span className="badge venue-type">Café</span></p>
              </div>
              <div className="col-6">
                <img src={this.state.modalVenue.photo}className="img-fluid" alt="Responsive image"/>
              </div>
            </div>

          </Modal.Body>

        </Modal>
      </div>
    )

  }

}

export default App;
