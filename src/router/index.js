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
      path: '/:id',
      name: 'BrowseStreamers',
      component: BrowseStreamers,
      meta: {
        title: ':id'
      }
    }
  ]
})