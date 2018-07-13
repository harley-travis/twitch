import axios from 'axios'
import './embedTwitch.min.js'

axios.defaults.baseURL = 'https://api.twitch.tv'
axios.defaults.headers.common['Client-ID'] = process.env.CLIENT_ID;

const appService = {
    getTopGames() {
        return new Promise((resolve) => {
            axios.get('/kraken/games/top')
            .then(response => {
                resolve(response.data.top)
            })
        })
    },
    getGameData(game) {
        return new Promise((resolve) => {
            axios.get('/kraken/search/games?query='+game+'&type=suggest')
            .then((response) => {
                resolve(response.data.games)  
            })
        })
    },
    searchGame(params) {
        return new Promise((resolve) => {
            axios.get('/kraken/search/games?query='+params+'&type=suggest&live=true')
            .then((response) => {
                resolve(response.data.games)  
            })
        })
    },
    getFirstLiveStream(game) {
        return new Promise((resolve) => {
            axios.get('/kraken/streams/?sort=views&stream_type=live&game='+game)
            .then((response) => {
                // send variables to calc the offset
                var total = response.data._total;
                var query = this.calculateSingleOffset(game, total)

                setTimeout(function(){ 
                    resolve(query)
                }
              , 500);

            })
        })
    },
    calculateSingleOffset(game, total) { 
        let offset = total - 1;
        console.log(offset, ' offset in single offset')
        return new Promise((resolve) => {
            axios.get('/kraken/streams?sort=views&game='+game+'&offset='+offset+'&limit=1')
            .then((response) => {             
                setTimeout(function(){ 
                    resolve(response.data.streams)
                }
              , 500);
            })
        })
    },
    getLiveStreams(game) {
        return new Promise((resolve) => {
            axios.get('/kraken/streams?sort=views&stream_type=live&game='+game)   
            .then((response) => {
                var total = response.data._total;
                var query = this.calculateOffset(game, total)

                setTimeout(function(){ 
                    resolve(query)
                }
              , 500);

            })
        })
    },
    calculateOffset(game, total) {
        let offset = ''
        let limit = ''

        if(total <= 7) {
            offset = total - 1
            limit = total
        } else {
            offset = total - 7
            limit = 7
        }

        return new Promise((resolve) => {
            axios.get('/kraken/streams?sort=views&game='+game+'&offset='+offset+'&limit='+limit)
            .then((response) => {
                resolve(response.data.streams)
            })
        })
    },
    getTwitchStream(channel) {
       return setTimeout(function(){ 

            // append the twitch-embed code
            var div = document.createElement("div");
            div.id = 'twitch-embed'
            document.getElementById('twitch-embed-wrapper').appendChild(div)
            
            new Twitch.Embed('twitch-embed', {
                width: '100%',
                height: 480,
                channel: channel
            });
        }
      , 700);
    }
}

export default appService