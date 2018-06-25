<template>
  <div class="browseGames container">
    <h1>Browse Top Games</h1>
   
    <!-- UX messages -->
    <div class="alert">
      <div v-show="warning" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error!</strong> Either this game is not currently being streamed, or the game does not exist. Whomp Whomp.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>

    <!-- search query -->
    <input type="text" placeholder="Search Game" v-model="search" @keyup.enter="searchGame(search)"><button v-on:click="searchGame(search)">Search</button>

    <div class="search">
      <div class="searchWrapper">
        <div v-for="search in searches" class="game-card">
          <div class="game-img-wrapper">
            <router-link :to="{ name: 'BrowseStreamers', params: {id: search.name} }"><img :src="search.box.large | imgsize" class="game-img"></router-link>
          </div>
          <a href=""><span class="title">{{search.name}}</span></a>
        </div>
      </div>
    </div>

    <!-- display top games -->
    <div class="game">
      <div class="gameWrapper">
        <div v-for="game in games" class="game-card">
          <div class="game-img-wrapper">
            <router-link :to="{ name: 'BrowseStreamers', params: {id: game.name} }"><img :src="game.box_art_url | imgsize" class="game-img"></router-link>
          </div>
          <a href=""><span class="title">{{game.name}}</span></a>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'BrowseGames',
  data: function() {
    return {
      games: [],
      searches: [],
      warning: false,
      search: ''
    }
    
  },
  created() {
      this.getTopGames()
  },
  filters: {
    imgsize: function(value) {
      if (!value) return ''
      value = value.toString()
      let replace = value.replace("-{width}x{height}", "")
      return replace
    }
  },
  methods: {
    getTopGames(){
      axios.defaults.headers.common['Client-ID'] = 'xd5ui0gqy6f2n0tgah5jhjtmegqxr6';
      axios.get('https://api.twitch.tv/helix/games/top')
      .then((response) => {

        this.games = response.data.data;

        if(this.warning = true) {
          this.warning = false;
        }
          
      }).catch((error) => { console.log(error); });
    },
    searchGame(params) {
      axios.defaults.headers.common['Client-ID'] = 'xd5ui0gqy6f2n0tgah5jhjtmegqxr6';
      axios.get('https://api.twitch.tv/kraken/search/games?query='+params+'&type=suggest&live=true')
      .then((response) => {

        this.searches = response.data.games;

        if(this.searches == null || this.searches == ''){
          this.warning = true;
        }

      }).catch((error) => { console.log(error); });
    }    
  }
}
</script>

<style>
h1 {
  text-align: left;
}
.game-card {
    display: inline-block;
    padding: 10px;
}
  .game-img {
    width: 100%;
    max-width: 300px;
    height: 400px;
}
</style>
