

// const api_url = 'https://ecommerce-djangorestapi.herokuapp.com'
const api_url = "http://localhost:8000"


const send_request = (url,method='GET',data=null,auth=false) => {

	var headers= null

	if (auth){
		headers = {
          'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
          'Content-Type': 'application/json',
          'accept': 'application/json',
		}
	}else{
		headers = {
          'Content-Type': 'application/json',
          'accept': 'application/json',
		}		
	}

	var requestOptions = null

	if (method === "POST"){
	    requestOptions = {
	        method: method,
	        headers: headers,
	        body: JSON.stringify(data)
	    };

	}else{
	    requestOptions = {
	        method: method,
	        headers: headers
	    };
	}

    const fetch_url = api_url + url


    console.log(requestOptions)

    return fetch(fetch_url,requestOptions)



  }



export default send_request