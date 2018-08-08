<template>
  <div id="app">
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
			<strong>Welcome To Beta!</strong> ZeroStream.Club is in beta mode, so there might be some hiccups. Deal with it.
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
		</div>
    <pageHeader></pageHeader>
    <router-view></router-view>
    <pageFooter></pageFooter>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>


body {
  background-color: #fafafa !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.alert {
    margin-bottom: 0 !important;
}
</style>
