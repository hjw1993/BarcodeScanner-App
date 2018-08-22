import {combineReducers} from 'redux';
import * as ACTIONS from '../actions/index'

const initialState={
	sending_req:false,
	message:'test',
	upc:'',
	popupVisible:false,
}


const reducers = (state=initialState,action)=>
{
	switch(action.type){
		case ACTIONS.SET_UPC:
			return Object.assign({},state,{upc:action.upc});
		case ACTIONS.CLEAR_UPC:
			return Object.assign({},state,{upc:''});
		case ACTIONS.SENDING_REQ:
			return Object.assign({},state,{sending_req:action.sending_req})
		case ACTIONS.GET_RES:

			if(action.res.success)
			{
				return Object.assign({},state,{message:'Found the Item'})
			}
			else
			{
				return Object.assign({},state,{message:action.res.message})
			}
		case ACTIONS.POPUP_VISIBILITY:
			return Object.assign({},state,{popupVisible:action.visible})
		default:
			return state;
	}
}

const CombinedReducers =  combineReducers({reducers})

export default CombinedReducers
