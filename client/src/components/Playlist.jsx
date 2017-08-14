import React from 'react';
import axios from 'axios';

let spotifyCredentials = {
	client_id: '1b4dd6acf0c14120b5fa6ae37b4c773a',
	client_secret: '365aec3923fe452fbbeb31fe842c2a4c',
	redirect_URIs: ['https://concertmate.herokuapp.com/callback', 'http://localhost:8888/callback']
};

let accessToken = 'BQCMwC19LrnRoyhPTiUbi5gFdrFM584B5xcLvVgZrcrlf3cFYEIyxVsVYvpmeK2qCscz9iiBtk_qjm8aKh6a-Q3qyg63LUU0sABKLXswc68Lu9AimAkvu58EEdm53eQrjrvzPI3a0Nxgviuam89CajzKU5Z7emO2NiRI1WH_XG0MIIaT72JUci7mdU6BPsggJ5SbpWwkmgCVbbvtcyR4yIK2gBDH1oZAdYrWPMXaf6QoN_O_V4MhA79thd1Ye1633YvspMzJ7iW6wm5AHj8';

let spotifyHeaders = {
	'Authorization': 'Bearer ' + accessToken,
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
};	

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: '',
			userId: null,
			playlistId: null
		}
	}

	componentWillMount() {
		//these two steps may be unnecessary for time being
			// 4. request refresh and access tokens
			// 5. tokens returned to app
			// 6 and 7: do work
		
		// 1. get request for authorization
		axios.get('https://accounts.spotify.com/authorize', {
			headers: spotifyHeaders,
			params: {
				// 2. do so with authorized scopes
				client_id: spotifyCredentials.client_id,
				response_type: 'code',
				redirect_uri: spotifyCredentials.redirect_URIs[1]
			}
		})
		// 3. user redirected back to redirect URI
			//  how to deal with redirect? perhaps build route outside of component will mount. This should only be for 1st step
		.then((response) => {
			console.log('code for access token: ', response.code);
		})
		.catch((error) => {
			console.log('authorization error: ', error);
		});


		//// this promise chain will fetch the user id, create a playlist, then set the state for those two props
		// axios({
		// 	url: 'https://api.spotify.com/v1/me',
		// 	method: 'get',
		// 	headers: spotifyHeaders
		// })
		// //create playlist
		// .then((userId) => {
		// 	console.log('got userId: ', userId);
		// 	this.setState({
		// 		userId: userId
		// 	});

		// 	return axios({
		// 		url: `https://api.spotify.com/v1/users/${userId}/playlists`,
		// 		method: 'post',
		// 		headers: spotifyHeaders,
		// 		data: {
		// 			name: 'ConcertMate'
		// 		}
		// 	})
		// .then((playlist) => {
		// 	//setstate
		// 	this.setState({
		// 		playlistId: playlist.id
		// 	})

		// 	console.log('Playlist created', playlist);
		// })
		// });

	}

	handleArtistEntry(artistEntryEvent) {
		this.setState({
			artist: artistEntryEvent.target.value
		});
	}

	handleFormSubmit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		let data = {
			artist: this.state.artist
		};
		axios.post('/spotify', data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
	  return (
	  	<div>
		    <div>
		    	<form action='/' method='post' onSubmit={this.handleFormSubmit.bind(this)}>
		    		<label>
		    			Here for testing purposes:
		    			<input type="text" value={this.state.artist} onChange={this.handleArtistEntry.bind(this)}/>
		    		</label>
		    	</form>
		    </div>
		    <div>
		    	<iframe src='https://open.spotify.com/embed?uri=spotify:user:1211115253:playlist:2GKsWTId44AS4ZaeHKnowP&theme=black'
  					width="300" height="120"
  					frameBorder="0" allowTransparency="true"></iframe>
		    </div>
	    </div>
	  )		
	}
}

export default Playlist;