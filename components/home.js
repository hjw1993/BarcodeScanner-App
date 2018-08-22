import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, Modal, 
    TouchableHighlight,ActivityIndicator,Image,ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera';
import {BarcodeFinder} from './scanner/barcodeScanner';
import {createStore} from 'redux';
import PopupDialog, { DialogTitle,SlideAnimation  } from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../actions/index'
import FontAwesome, { Icons } from 'react-native-fontawesome';


var request = require('../common/request')
var config = require('../common/config')
var _=require('lodash')

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class Home extends Component {


  constructor(props) {
    super(props);
  
    this.state = {
      data:null,
      loading:false,
      modalVisible:false,
      
    };
    this._itemSearch=_.debounce(this._sendRequest,2000)
  }

  componentDidMount() {
    
    
    
    
  }

  _searchEvent(res)
  {
    
    if(this.props.upc==''&&!this.props.sending_req&&!this.props.popupVisible)
    {

      this.props.dispatch(Actions.sending_req(true))
      this.props.dispatch(Actions.set_upc(res.data))
      
      // console.warn('get request')
      // this.data=res.data;
      
      this._itemSearch(res.data);
    }
  }
  _sendRequest(res)
  {
    // console.warn(res)
    this.props.dispatch(Actions.fetchItemByUpc(res,this.popupDialog))
    
    this._setModalVisible()
    
    
  }
  _setModalVisible() {
    // this.popupDialog.show(() => {
    //   console.warn('callback - will be called immediately')
    // });
    

  }
  _closePopup()
  {
    // console.warn('onclosed called')
    this.props.dispatch(Actions.sending_req(false))
    this.props.dispatch(Actions.set_upc(''))
  }

  render() {
    return (
      <ImageBackground source={require('../static/image/items_bg.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.cameraBox}>

            <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                onBarCodeRead={(res)=>this._searchEvent(res)}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            >
              <BarcodeFinder width={280} height={220} borderColor="red" borderWidth={2} />
            </RNCamera>
          </View>

         
          { this.props.sending_req?
            
              <View style={styles.SpinnerBox}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text style={styles.SpinnerText}>Searching Item in the Datebase</Text>
              </View>
            
            :null
          }
          
         


          
          <PopupDialog
                    dialogTitle={<DialogTitle title="Item search result" />}

                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    height={200}
                    onDismissed={()=>{this._closePopup()}}
                  >
                <View >
                  <Text style={[{textAlign: 'center' }]}>{this.props.message}</Text>
                </View>
                
          </PopupDialog>
          

        </View>
      </ImageBackground>
    );
  }

  
}
Home.PropTypes={
  
  sending_req: PropTypes.bool.isRequired,
  upc: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  popupVisible:PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const {sending_req,upc,message,popupVisible}= state.reducers
  return {sending_req,upc,message}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'skyblue',
    justifyContent: 'center', 

  },
  preview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',

    width:30,
    height:300,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cameraBox:
  {
    flex:1,
    flexDirection: 'row',
    marginTop:100,

    
  },
  SpinnerBox:
  {
    
    position: 'absolute',
    top:'70%',
    left:'30%',
    

    
  },
  SpinnerText:{
    textAlign: 'center',
    fontSize: 10,
    fontWeight:'bold' 
  }
});
export default connect(mapStateToProps)(Home)