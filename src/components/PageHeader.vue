<template>
    <div class="header">
        <div class="header-bar container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <router-link @click.native="clearSearch()" to="/" class="logo"><font-awesome-icon icon="spinner" class="logo-icon" /> ZeroStream.Club</router-link>
                    </div>
                    <div class="col-sm">
                        <div class="form-wrapper">
                            <form class="form-inline align-right">
                                <div class="form-group mx-sm-3 mb-2">
                                    <input type="text" v-model="search" @keyup="searchGame()" @keyup.esc="clearSearch()" class="form-control" placeholder="Search Game">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><font-awesome-icon icon="search" /></span>
                                    </div>
                                </div>
                                <div class="search-results" v-if="options.length > 0">
                                    <div v-if="showInside" v-on-clickaway="away">
                                        <ul class="list-group">
                                            <li class="list-group-item list-group-item-action" v-for="game in options.slice(0,5)" :key="game.id">
                                                <router-link @click.native="clearSearch()" :to="{ name: 'BrowseStreamers', params: {id: game.name} }">
                                                    <span class="search-game-title">{{game.name}}</span><img :src="game.box.small" class="search-game-img">
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>           
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appService from '../service.js'
import axios from 'axios'
// this is a directive you can install 
// https://github.com/simplesmiler/vue-clickaway 
import { directive as onClickaway } from 'vue-clickaway' 

export default {
    name: 'PageHeader',
    data: function() {
        return {
            search: '',
            options: [],
            showInside: false
        }   
    },
    directives: {
        onClickaway: onClickaway,
    },
    methods: {
        searchGame() {
            this.show()
            this.options = [];
            axios.defaults.baseURL = 'https://api.twitch.tv'
            axios.defaults.headers.common['Client-ID'] = process.env.CLIENT_ID;
            
            axios.get('/kraken/search/games?type=suggest&live=true',{params: {query: this.search}})
            .then((response) => {
                response.data.games.forEach((game) => {                   
                    this.options.push(game);
                })
            })
        },
        clearSearch() {
            this.hide()
            this.search = '';
            this.options = [];
        },
        show() {
    	    this.showInside = true 
        },
        hide() { 
            this.showInside = false
        },
        away: function() {
            this.hide()
        }
    }
}
</script>

<style>
.header-bar {
    background: #643097;
    background: -moz-linear-gradient(-45deg, #643097 0%, #e80cde 100%);
    background: -webkit-linear-gradient(-45deg, #643097 0%,#e80cde 100%);
    background: linear-gradient(135deg, #643097 0%,#e80cde 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#643097', endColorstr='#e80cde',GradientType=1 );
    color: #fff;
    padding: 15px;
    text-align: left;
}
.align-right {
    float: right;
    clear: both;
}
.logo-icon {
    color: #FF940D;
}
.logo {
    color: #fff;
    font-size: 1.6rem;
}
a.logo:hover {
    color: #fff;
    text-decoration: none;
}
.search {
    padding-top: 25px;
}
.game-img-wrapper {
  width: 165px;
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
.input-group-text {
    background-color: transparent !important; 
    border: 0 !important;
    border-radius: 0 !important;
    color: #fff !important;
}
.search-results {
    width: 75%;
    position: absolute;
    z-index: 99;
    top: 95%;
    right: 12%;
    text-align: right;
}
.search-game-title {
    padding-right: 15px;
}
</style>