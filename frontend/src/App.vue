<template>
    <div id="nav">
        <router-link v-if="$router.currentRoute._value.name !== 'BoardContainer'" to="/">Home</router-link> |
        <router-link to="/how-to">How to play</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
#app {
    font-family: helvetica, arial, sans-serif;
    color: #2c3e50;
    width: 100%;
}
html,
body {
    background-color: rgb(41, 41, 41);
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}
*,
*:before,
*:after {
    box-sizing: border-box;
}

#nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.75rem;
    @media (max-width: 480px) {
        font-size: 1rem;
    }
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
