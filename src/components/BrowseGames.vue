<template>
  <div class="browseGames heading-title container">

    <!-- UX messages -->
    <!-- <div class="alert">
      <div v-show="warning" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error!</strong> Either this game is not currently being streamed, or the game does not exist. Whomp Whomp.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div> -->

    <div class="row">
      <div class="left col-sm">
        <h1>Browse Top Games</h1>
      </div>
      <div class="right col-sm">

        <!-- search query -->
        <!-- <form class="form-inline">
          <div class="form-group mx-sm-3 mb-2">
            <input type="text" v-model="search" @keyup.enter="searchGame(search)" class="form-control" placeholder="Search Game">
          </div>
          <button v-on:click="searchGame(search)" class="btn btn-primary mb-2">Search</button>
        </form> -->
      </div>
    </div>
    
    <!-- display search results -->
    <!-- <div class="search">
      <div class="searchWrapper">
        <div v-for="search in searches" class="game-card">
          <div class="game-img-wrapper">
            <router-link :to="{ name: 'BrowseStreamers', params: {id: search.name} }">
              <img :src="search.box.large | imgsize" class="game-img"><br>
              <span class="title">{{search.name}}</span><br>
            </router-link>
          </div>
        </div>
      </div>
    </div> -->

    <!-- display top games -->
    <div class="row">
      <div class="gameWrapper">
        <div v-for="game in games" class="game-card">
          <div class="game-img-wrapper">
            <router-link :to="{ name: 'BrowseStreamers', params: {id: game.game.name} }">
              <img :src="game.game.box.large | imgsize" class="game-img"><br>
              <span class="title">{{game.game.name}}</span><br>
            </router-link>
              <span class="title">{{game.viewers | formatNumber}} Viewers</span><br>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>

import appService from '../service.js'

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
      this.getGames()
  },
  filters: {
    imgsize: function(value) {
      if (!value) return ''
      value = value.toString()
      let replace = value.replace("-{width}x{height}", "")
      return replace
    },
    formatNumber: function(value) {
      var numeral = require("numeral");
      return numeral(value).format("0,0");
    }
  },
  methods: {
    getGames(){
      appService.getTopGames().then(data => {
        this.games = data
      });
    },
    searchGame(params) {
      appService.searchGame(params).then(data => {

        let totalResults = data.length;

        if(totalResults = 0 || data == null || data == ''){
            this.warning = true;
        } else {
            this.searches = data;
        }

      })
    }    
  }
}
</script>

<style>
.heading-title {
  margin-top: 25px;
}
h1 {
  text-align: left;
  padding-bottom: 25px;
  color: #643097;
}
.game-img-wrapper {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.game-card {
  display: inline-block;
  padding: 10px;
}
.game-img {
  width: 100%;
  max-width: 165px;
  height: 220px;
}
</style>
