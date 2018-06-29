import Vue from 'vue'
import Router from 'vue-router'
import BrowseGames from '@/components/BrowseGames'
import BrowseStreamers from '@/components/BrowseStreamers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BrowseGames',
      component: BrowseGames
    },
    {
      path: '/game/:id',
      name: 'BrowseStreamers',
      component: BrowseStreamers
    }
  ]
})
