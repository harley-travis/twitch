<template>
  <div class="watchStream">
    <h1>Streams</h1>
   
    <div class="stream">
      <div class="streamWrapper">
        <!-- <div v-for="stream in streams" class="stream-card">
          <span class="title">{{stream.title}}</span>
          <span class="views">Views: {{stream.viewer_count}}</span>
          <span class="game-title">Playing: {{stream.game_id}}</span>
        </div> -->


        <div v-for="streaming in live" class="stream-card">
          <div class="video-wrapper">
            <iframe :src="streaming.channel.url | liveURL" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
          </div>

          <span class="title">{{streaming.channel.display_name}}</span>
          <span class="title">{{streaming.channel.display_name}}</span>
        </div>




      </div>
    </div>
   
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'WatchStream',
  data: function() {
    return {
      streams: [],
      live: []
    }
    
  },
  created() {
    this.getStreams()
    this.getLiveStream()
  },
  filters: {
    imgsize: function(value) {
      if (!value) return ''
      value = value.toString()
      let replace = value.replace("-{width}x{height}", "")
      return replace
    },
    liveURL: function(value) {
      if (!value) return ''
      value = value.toString()
      let subdomain = value.replace("www", "player")
      let channelName = subdomain.replace(".tv", ".tv/?channel=")
      return channelName
    }
  },
  methods: {
    getStreams(gameID) {
      gameID = '33214'
      axios.defaults.headers.common['Client-ID'] = process.env.CLIENT_ID;
      axios.get(process.env.TWITCH_API+'helix/streams?game_id='+gameID+'&type=live&first=6&viewer_count=1&language=en')
      .then((response) => {
        //console.log(response.data.data)
        this.streams = response.data.data;
      }).catch((error) => { console.log(error); });
    },
    getLiveStream(){

      axios.defaults.headers.common['Client-ID'] = process.env.CLIENT_ID;
      axios.get(process.env.TWITCH_API+'kraken/streams/?game=Overwatch')
      .then((response) => {
        console.log(response.data.streams)
        this.live = response.data.streams;
      }).catch((error) => { console.log(error); });
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
