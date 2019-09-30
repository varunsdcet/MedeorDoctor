import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView,Linking} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
let textRef = React.createRef();
let menuRef = null;
const GLOBAL = require('./Global');
import Geolocation from '@react-native-community/geolocation';
type Props = {};
import CalendarStrip from "react-native-calendar-strip";
let customDatesStyles = [];
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;
const images = [
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg",
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg",
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg"
];
import Carousel from 'react-native-banner-carousel';

import moment from 'moment';

var length = 0;
var commonHtml = "";


export default class Home extends Component {



    state = {
        text: '',
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',
        username: '',
        password: '',
        status :'',
        ipAdd : '',
        loading:'',
        marker :[],
        speciality:[],
        banner:[],
        articles:[],
        location:'',
        FlatListItems: [
            {"key": "#1",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#2",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#3",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#4",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#5",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },

        ],
        moviesList :[
            {

                title :'Doctor@Doorstep',
                image:require('./doorstep.png')
            },


            {

                title :'Nursing care@ Home',
                image:require('./nurse.png')
            },

            {

                title :'Medical Services @ Doorstep',
                image:require('./medical.png')
            },

            {

                title :'24x7 Online Consultation',
                image:require('./online-consultation.png')
            },

            {

                title :'Doctor Appointment @ Clinic',
                image:require('./appointment.png')
            },
            {

                title :'Hospital Admissions',
                image:require('./hospital.png')
            },
            {

                title :'Ambulance Booking',
                image:require('./ambulance.png')
            },
            {

                title :'Lab Test Booking',
                image:require('./lab-test.png')
            },
            {

                title :'Medical Equipments',
                image:require('./medical.png')
            },
            {

                title :'OPD Health Plans',
                image:require('./health.png')
            },

            {

                title :'Health Packages',
                image:require('./package.png')
            },
            {

                title :'Best Surgical Packages',
                image:require('./surgical.png')
            },


        ],

        results: [],
        selected:[],
        name :'',

    };

    static navigationOptions = ({ navigation }) => {
        return {
              header: () => null,
            title: 'AMBULANCE BOOKING',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#0592CC',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    hideLoading() {
        this.setState({loading: false})
    }
    getRespone = (res) => {
        this.setState({speciality:res.specialty})
        this.setState({banner:res.banners})
        this.setState({articles:res.articles})

    }
    _handleStateChange = (state) =>{

        const url = GLOBAL.BASE_URL +  'home_patient'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "type":"home_patient"




            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == true) {
                    this.getRespone(responseJson)
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });






        this.setState({location:GLOBAL.location})
    }





    renderPage(image, index) {

        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight ,resizeMode:'stretch'}} source={{ uri: image }} />
            </View>
        );
    }
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }
    _renderItems = ({item,index}) => {

        return (

            <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                <View style = {{flexDirection:'row',width :'100%'}}>

                    <View>
                        <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                               source={{ uri: item.patient_image }}/>



                    </View>

                    <View>

                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :'70%',marginTop:18}}>

                                {item.booked_for}
                            </Text>



                        </View>

                        <View style = {{flexDirection:'row'}}>
                            <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium'}}>

                                {item.appointment_date} -  {item.appointment_time}
                            </Text>


                        </View>







                            <Text style={{marginLeft : 5,width:window.width - 150,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium',}}>

                                Procedure: {item.doctor_procedure}
                            </Text>






                    </View>

                </View>



                <Text style={{margin :13,fontSize : 12,color :'#e73c50',fontFamily:'Poppins-Medium',}}>

                    Status :   {item.status}
                </Text>




            </View>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    myCallbackFunctions = (res) => {


        this.hideLoading()
        if (res.status == 200){
            this.setState({marker:res.role})
            length = 500

            commonHtml = `${stringsoflanguages.thereare} ${length} + ${stringsoflanguages.closed}`;
            this.setState({name:commonHtml})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    myCallbackFunction = (info) => {
        let r = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        //  this.mapView.root.animateToRegion(r,1);



        this.mapView.root.animateToCoordinate(r, 1);

        this.setState({currentLongitude:info.coords.longitude})
        this.setState({currentLatitude:info.coords.latitude})
        // this.setMenuRef.animateCamera(info.coords.latitude,info.coords.longitude)
      //  alert(this.state.currentLatitude)


        var url = GLOBAL.BASE_URL + 'getNearLabour';
        var self=this;



        axios.post(url, {
            lat: this.state.currentLatitude.toString(),
            lng: this.state.currentLongitude.toString(),

        })
            .then(function (response) {


                self.myCallbackFunctions(response.data)


                //    self.myCallbackFunction.bind()

                //   this.myCallbackFunction()


            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });


        // GLOBAL.long = info.coords.longitude
        // GLOBAL.lat = info.coords.latitude
        // alert(JSON.stringify(info))
    }
    _handlePress =() => {
        this.props.navigation.navigate('Register')
    }
    calculateDay(date){


        const url = GLOBAL.BASE_URL + 'doctor_history_appointment'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({

                "date":date,
                "doctor_id":GLOBAL.user_id,



            }),
        }).then((response) => response.json())
            .then((responseJson) => {



                if (responseJson.status == true) {
                    this.setState({results:responseJson.apointment_history})


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    componentDidMount(){
        let startDate = moment();
        for (let i=0; i<700; i++) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.dateNameStyle,
                dateNumberStyle: styles.dateNumberStyle,

                // Random color...
                dateContainerStyle: {shadowOpacity: 1.0,
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
            });
        }
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

        this.calculateDay(s)
    }
    _handlePress() {
        console.log('Pressed!');
    }
    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
        this.calculateDay(s)
    }
    callLocation(that){
        //alert("callLocation Called");
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({ currentLatitude:currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }
    setMenuRef = ref => menuRef = ref;
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    renderRowItem3 = (itemdata) => {
        var item = itemdata.item
        return (
            <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
            }>
                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 10, height: 225,borderRadius :6,width : Dimensions.get('window').width-20, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5}}>
                    <View style={{flexDirection: 'row', marginTop:6}}>
                        <Text style={{color:'black', fontSize:15,marginLeft:5,fontFamily:'Poppins-Medium',alignItems:'flex-start'}}>{item.name}</Text>
                        <Button style={{fontSize:12,color:'white',fontFamily:'Poppins-Regular',alignSelf:'center',}}
                                containerStyle={{height:20,width:60,borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'#FF2D00',overflow:'hidden',position:'absolute', right:0}}>
                            save 71%
                        </Button>
                    </View>

                    <View style={{flexDirection:'column', marginTop:5}}>
                        <View style={{flexDirection:'row', marginTop:5}}>
                            <Text style={{color:'#808080', fontSize:13,fontFamily:'Poppins-Regular',marginLeft:5}}>{item.testno}</Text>
                            <Text style={{color:'black',fontSize:13,fontFamily:'Poppins-Medium',marginLeft:3}}>76 Tests</Text>
                        </View>
                        <Text style={{color:'#808080',fontFamily:'Poppins-Regular',fontSize:15,marginTop:3,marginLeft:5}}>{item.testDescription}</Text>
                    </View>


                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:5}}
                                containerStyle={{height:25,width:183,backgroundColor:'white',overflow:'hidden',marginLeft:5,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>{item.recomendation}</Text>
                            Male,Female
                        </Button>

                        <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:40}}
                                containerStyle={{height:25,width:122,backgroundColor:'white',overflow:'hidden',marginLeft:9,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>{item.limit}</Text>
                            5-99yrs.
                        </Button>

                    </View>


                    <View style={{flexDirection:'row',marginTop:22,alignItems:'center'}}>

                        <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹6670/-</Text>

                        <Text style={{fontSize:18,color:'black',marginLeft:10,fontFamily:'Poppins-Medium'}}>₹1999/-</Text>

                        <Button style={{fontSize:17,color:'white',fontFamily:'Poppins-Medium'}}
                                containerStyle={{height:50,width:100,backgroundColor:'#0592CC',overflow:'hidden',borderTopLeftRadius:4,borderBottomLeftRadius:4,justifyContent:'center',marginLeft:54}}
                                >
                            Details
                        </Button>


                    </View>



                </View>
            </TouchableOpacity>

        )
    }

    selectedFirst = (index) =>{
        if (index == 0){
            this.props.navigation.navigate('DoctorVisit')
        }else if (index == 1){
            this.props.navigation.navigate('Nurse')
        }else if (index == 2){
            this.props.navigation.navigate('MedicalService')
        }else if (index == 3){
            this.props.navigation.navigate('BookingAppointment')
        }else if (index == 4){
            this.props.navigation.navigate('OfflineBooking')
        }else if (index == 5){
            this.props.navigation.navigate('HospitalList')
        }else if (index == 6){
            this.props.navigation.navigate('AmbulanceBooking')
        }else if (index == 9){
    this.props.navigation.navigate('OpdHealth')
}else if (index == 10){
            this.props.navigation.navigate('HealthPackege')
        }
        else if (index == 11){
            this.props.navigation.navigate('SurgicalPackage')
        }
    }


    renderRowItem2s = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
            }>
                <View   style  = {{width:window.width/2.2 - 8,margin:4, height:200,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >




                    <Image source={{uri :itemData.item.image}}
                           style  = {{width:window.width/2.2 - 8, height:150,marginTop: 3,alignSelf:'center',marginLeft:5,
                           }}

                    />

                    <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'##0592CC',textAlign:'center',width:window.width/2.2 - 8}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }

    renderRowItem2 = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
            }>
                <View   style  = {{width:window.width/2.2 - 8,margin:4, height:200,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >




                    <Image source={{uri :itemData.item.image}}
                           style  = {{width:window.width/2.2 - 8, height:150,marginTop: 3,alignSelf:'center',marginLeft:5,
                           }}

                    />

                    <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'##0592CC',textAlign:'center',width:window.width/2.2 - 8}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }

    renderRowItem1 = (itemData) => {
        return (
            <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
            }>
                <View   style  = {{width:window.width/3 - 8,margin:4, height:105,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >




                    <Image source={itemData.item.image}
                           style  = {{width:45, height:45,marginTop: 3,alignSelf:'center',marginLeft:5,resizeMode:'contain'
                           }}

                    />

                    <Text style = {{fontSize:12,margin:1,fontFamily:'Poppins-Medium',color:'black',textAlign:'center'}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }

    resPress = () => {
        this.props.navigation.navigate('OfflineBooking')
    }
    render() {


        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='white' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View>

                    <View style = {{flexDirection:'row',width:'100%',height:54,marginBottom: 0,backgroundColor:'#0e2240'}}>


                        <Text style = {{color:'white',fontFamily:'Poppins-Regular',fontSize:20,marginTop:9,alignSelf:'center',textAlign:'center',width:'100%'}}>
                           MY BOOKINGS

                        </Text>


                    </View>



                    <KeyboardAwareScrollView>








                        <CalendarStrip

                            calendarAnimation={{type: 'sequence', duration: 30}}
                            daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#80D8CF'}}
                            style={{height:120, paddingTop: 15}}
                            calendarHeaderStyle={{color: 'black'}}
                            calendarColor={'white'}
                            highlightDateNameStyle={{color:'white'}}
                            highlightDateNumberStyle  ={{color:'white'}}


                            customDatesStyles={customDatesStyles}
                            dateContainerStyle = {{shadowOpacity: 1.0,
                                shadowRadius: 1,
                                shadowColor: 'black',
                                shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' }}

                            iconContainer={{flex: 0.1}}
                            onDateSelected={(date)=> this.dates(date)}
                        />

                        <FlatList style= {{flexGrow:0,margin:8}}
                                  data={this.state.results}
                                  numColumns={1}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItems}
                        />
</KeyboardAwareScrollView>



                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f7f8f9'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    untitled103030314: {
        resizeMode :'contain',
        marginTop : -50,
        marginLeft :35,
        height: 100,
        width: 100,
        backgroundColor: "transparent"
    },
    aboutUs: {


        backgroundColor: "transparent",
        textAlign: "center",
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    },
    rect: {
        flexDirection :'column',
        marginLeft : 10,
        width: window.width/2 -20,
        height: 120,

        backgroundColor: "rgba(255,255,255,1)",
        opacity: 1,
        shadowColor: "rgba(212,212,212,1)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 5,
        elevation: 15,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,1)",
        borderRadius: 11
    }
})