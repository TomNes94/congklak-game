<template lang="pug">
.board-container
    board
</template>

<script>
import Board from "../components/Board";
export default {
    name: "Home",
    components: { Board }
};
</script>

<style lang="scss" scoped>
.board-container {
    background-color: black;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
