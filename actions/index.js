var request = require('../common/request')
var config = require('../common/config')

export const SET_UPC = 'SET_UPC';

export const set_upc = (upc)=>({
	type:SET_UPC,
	upc:upc
});

export const CLEAR_UPC = 'CLEAR_UPC';

export const clear_upc=()=>
{
	type:CLEAR_UPC
}

export const SENDING_REQ = 'SENDING_REQ'

export const sending_req = (sending_req)=>(
{
	type:SENDING_REQ,
	sending_req:sending_req
})


export const GET_RES = 'GET_RES'

export const get_res = (res)=>(
{
	type:GET_RES,
	res:res
})


export const POPUP_VISIBILITY = 'POPUP_VISIBILITY'

export const popup_visibility = (visible)=>(
{
	type:POPUP_VISIBILITY,
	visible:visible
})



export function fetchItemByUpc(upc,dialog)
{
		return (dispatch)=>
		{
			request.get(config.api.base+config.api.search,{upc:upc})
		      .then((data)=>{
		        if(data.success)
		        {
		          dispatch(get_res({success:true,message:'found'}))
		          
		        }
		        else
		        {
		          
		          dispatch(get_res({success:false,message:data.message}))
		        }
		        
		        dialog.show()

		      }).catch((err)=>{
		      console.log(err)
		      dispatch(get_res({success:false,message:err}))
		      
		      AlertIOS.alert('Something wrong!')
		    })
	  	}
}