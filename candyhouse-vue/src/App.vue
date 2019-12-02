<template>
  <div id="app">
    <div id="nav">
      <router-view />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app,
#nav {
  height: 100%;
  width: 100%;
}
</style>
