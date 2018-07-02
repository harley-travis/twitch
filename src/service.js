import axios from 'axios'

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
                 resolve(query)
            })
        })
    },
    calculateSingleOffset(game, total) { 
        let offset = total - 1;
        return new Promise((resolve) => {
            axios.get('/kraken/streams?sort=views&game='+game+'&offset='+offset+'&limit=1')
            .then((response) => {              
                resolve(response.data.streams)
            })
        })
    },
    getLiveStreams(game) {
        return new Promise((resolve) => {
            axios.get('/kraken/streams?sort=views&stream_type=live&game='+game)   
            .then((response) => {
                var total = response.data._total;
                var query = this.calculateOffset(game, total)
                resolve(query)
            })
        })
    },
    calculateOffset(game, total) {
        let offset = total - 7;
        return new Promise((resolve) => {
            axios.get('/kraken/streams?sort=views&game='+game+'&offset='+offset+'&limit=7')
            .then((response) => {
                resolve(response.data.streams)
            })
        })
    }
}

export default appService