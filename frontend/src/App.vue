<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
#app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 100%;
    width: 100%;
}
html,
body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: black;
    font-size: 1.75rem;
    a {
        font-weight: bold;
        color: white;
        margin: 1% 2%;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
