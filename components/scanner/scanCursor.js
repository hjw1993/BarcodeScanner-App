

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export class ScanCursor extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	left:20,
	  	
	  	
	  };
	}


	render()
	{
		return (

			<View style={styles.container}>
				<View style={[{borderLeftWidth:2},
							styles.curPos,
							{left:this.state.left},
							{top:this.state.top}
							]}/>
				

			</View>


			);
		
	}


}

var styles = StyleSheet.create({
  container: {
    
    justifyContent: "flex-start",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width:220,
    height:280,
  },
  curPos:{
  	position: 'absolute',
  	borderColor: 'yellow',
  	height:220,
  	width:20,
  }
});