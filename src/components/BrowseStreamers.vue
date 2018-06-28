<template>
  <div class="browseStreamers container">
    <h1>Streams</h1>
   
    <div class="stream">
      <div class="streamWrapper">
        <div v-for="live in streams" class="stream-card">
          <div class="video-wrapper">
            <iframe :src="live.channel.url | liveURL" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
          </div>
          <strong><span class="title">{{live.channel.display_name}}</span></strong><br>
          <span class="title">{{live.channel.status}}</span><br>
          <span class="title">{{live.viewers | formatNumber}} Views</span><br>
        </div>

        <ul class="streamers">
          <li v-for="streaming in live.slice().reverse()" class="row streamer-list">

            <div class="streamer-wrapper">
              <div class="game-img-wrapper">
                <a :href="streaming.channel.url" target="_blank"><img :src="streaming.preview.large" class="game-img"></a>
              </div>
              <div class="row streamer-info">
                <div class="left col-sm">
                  <a :href="streaming.channel.url" target="_blank"><img :src="streaming.channel.logo" class="streamer-img"></a>
                </div>
                <div class="right col-11">
                  <span class="title">{{streaming.channel.status}}</span>
                  <span class="title">{{streaming.channel.display_name}}</span>
                </div>
              </div>
            </div>

            <!-- <div class="left col-sm display-inline">
              <div class="stream-img-wrapper">
                <a :href="streaming.channel.url" target="_blank"><img :src="streaming.preview.large" class="stream-img"></a>
              </div>
            </div>
            <div class="right col-sm display-inline">
              <strong><span class="title">{{streaming.channel.display_name}}</span></strong><br>
              <span class="title">{{streaming.channel.status}}</span><br>
              <span class="title">{{streaming.viewers | formatNumber}} Views</span><br>
            </div> -->
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>

import appService from '../service.js'

export default {
  name: 'BrowseStreamers',
  data: function() {
    return {
      streams: [],
      live: []
    }
    
  },
  created() {
    this.getFirstLiveStream()
    this.getLiveStreams()
  },
  filters: {
    imgsize: function(value) {
      if (!value) return ''
      value = value.toString()
      let replace = value.replace("-{width}x{height}", "")
      return replace
    },
    liveURL: function(value) {
      // filter to change the channel url to the embed video url
      if (!value) return ''
      value = value.toString()
      let subdomain = value.replace("www", "player")
      let channelName = subdomain.replace(".tv", ".tv/?channel=")
      return channelName
    },
    formatNumber: function(value) {
      var numeral = require("numeral");
      return numeral(value).format("0,0");
    }
  },
  methods: {
    getLiveStreams(game){
      game = this.$route.params.id;
      appService.getLiveStreams(game).then(data => {
        this.live = data
      });
    },
    getFirstLiveStream(game) {
      game = this.$route.params.id;
      appService.getFirstLiveStream(game).then(data => {
        this.streams = data
      });
    }
  }
}
</script>

<style>
ul > :first-child {
  display: none;
}
li {
  list-style: none;
}
img.stream-img {
    width: 100%;
    padding-right: 10px;
}
.streamer-list {
  background-color: #fff;
  margin: 10px 0;
  border-bottom: 1px solid #eee;
  padding: 15px;
}
.streamer-img {
    width: 100%;
    max-width: 50px;
}
</style>
