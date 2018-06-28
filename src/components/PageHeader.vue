<template>
    <div class="header">
        <div class="header-bar container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <router-link to="/" class="logo">Streamers</router-link>
                    </div>
                    <div class="col-sm">
                        <form class="form-inline align-right">
                            <div class="form-group mx-sm-3 mb-2">
                                <input type="text" v-model="search" @keyup.enter="searchGame(search)" class="form-control" placeholder="Search Game">
                            </div>
                            <button v-on:click="searchGame(search)" class="btn btn-outline-light mb-2">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <!-- display search results -->
                <div class="search">
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
            searches: [],
            search: ''
        }   
    },
    methods: {
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
.header-bar {
    background-color: #643097;
    color: #fff;
    padding: 15px;
    text-align: left;
}
.align-right {
    float: right;
    clear: both;
}
.logo {
    color: #fff;
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
</style>