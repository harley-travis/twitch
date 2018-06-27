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
            axios.get('/kraken/streams/?language=en&game='+game+'&limit=1')
            .then((response) => {
                resolve(response.data.streams)
            })
        })
    },
    getLiveStreams(game) {
        return new Promise((resolve) => {
            axios.get('/kraken/streams?sort=views&language=en&stream_type=live&game='+game)   
            .then((response) => {
                // send variables to calc the offset
                var total = response.data._total;
                this.calculateOffset(game, total)

                resolve(response.data.streams)
            })
        })
    },
    calculateOffset(game, total) {
        //https://discuss.dev.twitch.tv/t/sort-stream-by-view-count/16359/3
        
        let offset = total - 5;
        let amount = total - offset;

        console.log(total, ' total')   // 9437
        console.log(offset, ' offset') // 9432
        console.log(amount, ' amount') // 5

        axios.get('/kraken/streams?sort=views&game='+game+'offset='+offset)
        .then((response) => {
            console.log(response.data, ' calcualted offset')
            return response.data.streams
        })
        

    }
}

export default appService