<template>
  <div class="browseStreamers heading-title container">

    <div v-for="live in streams" :key="live.id">
      <h1>{{live.channel.game}}</h1>
    </div>

    <div v-if="loading" class="row">
      <div class="loader-wrapper">
        <img :src="img.gif" class="loader">
      </div>
    </div>

    <div class="streamWrapper">
      <div class="row">
        <div v-for="live in streams" :key="live.id" class="col-12 stream-card">
          <div class="twitch-vid-wrapper">
            <div id="twitch-embed-wrapper"></div>
          </div>
          <span class="title">{{live.channel.status}}</span><br>
          <strong><a :href="live.channel.url" target="_blank"><span class="title">{{live.channel.display_name}}</span></a></strong><br>
          <span class="title">{{live.viewers | formatNumber}} Views</span><br>
        </div>
      </div>

      <div class="row streamer-list">
        <div v-for="streaming in live.slice().reverse()" :key="streaming.id" class="col-sm-4 streamer-list">
          <div class="streamer-wrapper">
            <div class="preview-wrapper">
              <a :href="streaming.channel.url" target="_blank"><img :src="streaming.preview.large" class="preview-img"></a>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <a :href="streaming.channel.url" target="_blank"><img :src="streaming.channel.logo" class="streamer-img"></a>
              </div>
              <div class="col-sm-9 channel-details">
                <span class="title">{{streaming.channel.status}}</span><br>
                <a :href="streaming.channel.url" target="_blank"><span class="title">{{streaming.channel.display_name}}</span></a><br>
                <span class="title">{{streaming.viewers | formatNumber}} Views</span>
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
import '../embedTwitch.min.js'

export default {
  name: 'BrowseStreamers',
  data: function() {
    return {
      id: this.$route.params.id,
      streams: [],
      live: [],
      loading: true,
      img: {
        gif: require('../assets/img/loader.gif')
      }
    }
  },
  created() {
    this.getLiveStreams()
  },
  watch: {
      // in order to use the same componenet with different data points
      // we need to create a watch to see if there is a change in the code
      // the id is referenced in the data()
      '$route' (to, from) {
      this.id = to.params.id
      this.getLiveStreams()
    }
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
    getLiveStreams(game){
      game = this.id;
      this.getFirstLiveStream(game)

      appService.getLiveStreams(game).then(data => {
        this.live = data
        this.loading = false
      });
    },
    getFirstLiveStream(game) {
      var channelName = ''

      appService.getFirstLiveStream(game).then(data => {
        this.streams = data
        channelName = this.streams[0].channel.display_name

        // remove the twitch embed code
        var embed = document.getElementById('twitch-embed')
        if(embed) {
            document.getElementById('twitch-embed').remove()
        } 

        appService.getTwitchStream(channelName)
      });
    }
  }
}
</script>

<style>
h1 {
  text-align: left;
  padding-bottom: 25px;
  color: #643097;
}
.heading-title {
  margin-top: 25px;
}
img.stream-img {
  width: 100%;
  padding-right: 10px;
}
.loader-wrapper {
  margin: 0 auto;
  padding: 100px;
}
img.loader {
  max-width: 80px;
  height: 80px;
}
.streamer-wrapper {
  background-color: #fff;
}
.streamer-list {
  margin-top: 25px;
}
.streamer-list:first-child {
    display: none;
}
.streamer-img {
  width: 100%;
}
.preview-wrapper {
  max-width: 420px;
  width: 100%;
  padding-bottom: 5px;
}
.preview-img {
  width: 100%;
}
.hidden {
  display: none;
}
.channel-details {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
