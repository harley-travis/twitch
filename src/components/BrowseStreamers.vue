<template>
  <div class="browseStreamers heading-title container">

    <div v-for="live in streams">
      <h1>{{live.channel.game}}</h1>
    </div>

      <div class="streamWrapper">
        <div class="row">
          <div v-for="live in streams.slice().reverse()" class="col-12 stream-card">
            <div class="video-wrapper">
              <iframe :src="live.channel.url | liveURL" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
            </div>
            <span class="title">{{live.channel.status}}</span><br>
            <strong><a :href="live.channel.url" target="_blank"><span class="title">{{live.channel.display_name}}</span></a></strong><br>
            <span class="title">{{live.viewers | formatNumber}} Views</span><br>
          </div>
        </div>

        <div class="row streamer-list">
          <div v-for="streaming in live.slice().reverse()" class="col-sm-4 streamer-list">
            <div class="streamer-wrapper">
              <div class="preview-wrapper">
                <a :href="streaming.channel.url" target="_blank"><img :src="streaming.preview.large" class="preview-img"></a>
              </div>
              <div class="row">
                <div class="col-sm-3">
                  <a :href="streaming.channel.url" target="_blank"><img :src="streaming.channel.logo" class="streamer-img"></a>
                </div>
                <div class="col-sm-9">
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
h1 {
  text-align: left;
  padding-bottom: 25px;
}
.heading-title {
  margin-top: 25px;
}
img.stream-img {
  width: 100%;
  padding-right: 10px;
}
.streamer-wrapper {
  background-color: #fff;
}
.streamer-list {
  margin-top: 25px;
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
</style>
