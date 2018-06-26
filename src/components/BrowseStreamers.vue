<template>
  <div class="browseStreamers container">
    <h1>Streams</h1>
   
    <div class="stream">
      <div class="streamWrapper">
        <div v-for="live in streams" class="stream-card">
          <div class="video-wrapper">
            <iframe :src="live.channel.url | liveURL" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
          </div>
          <span class="title">{{live.channel.display_name}}</span>
        </div>

        <ul>
          <li v-for="streaming in live" class="stream-card">
            <div class="stream-img-wrapper">
              <a :href="streaming.channel.url" target="_blank"><img :src="streaming.preview.large" class="stream-img"></a>
            </div>
            <span class="title">{{streaming.channel.display_name}}</span>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

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
      // filter to change the channel url to the embed video url
      if (!value) return ''
      value = value.toString()
      let subdomain = value.replace("www", "player")
      let channelName = subdomain.replace(".tv", ".tv/?channel=")
      return channelName
    }
  },
  methods: {
    getLiveStream(game){
      game = this.$route.params.id;
      axios.defaults.headers.common['Client-ID'] = 'xd5ui0gqy6f2n0tgah5jhjtmegqxr6';
      axios.get('https://api.twitch.tv/kraken/streams/?game='+game+'&language=en&limit=7&viewers=0')
      .then((response) => {
        this.live = response.data.streams;
      }).catch((error) => { console.log(error); });
    },
    getFirstLiveStream(game) {
      game = this.$route.params.id;
      axios.defaults.headers.common['Client-ID'] = 'xd5ui0gqy6f2n0tgah5jhjtmegqxr6';
      axios.get('https://api.twitch.tv/kraken/streams/?game='+game+'&language=en&limit=1')
      .then((response) => {
        this.streams = response.data.streams;
      }).catch((error) => { console.log(error); });
    }
    
  }
}
</script>

<style>
ul > :first-child {
  display: none;
}
</style>
