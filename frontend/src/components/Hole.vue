<template lang="pug">
span.circle(@click="onClickHandler")
    img.circle-small(:src="require('../assets/shell.png')" v-if="isFilled")
    span.text-number-stones {{nrStones}}
</template>

<script>
export default {
    name: "Hole",
    props: ["isFilled", "nrStones", "index", "player"],
    methods: {
        onClickHandler(e) {
            e.stopPropagation();
            this.$emit("move", { index: this.index, player: this.player });
        }
    }
};
</script>

<style lang="scss" scoped>
.circle {
    position: relative;
    height: 75px;
    width: 75px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    &:hover {
        background-color: grey;
    }
}
.circle-small {
    position: absolute;
    top: 25%;
    left: 25%;
    height: 50%;
    width: 50%;
    display: inline-block;
    cursor: pointer;
}

.text-number-stones {
    position: absolute;
    bottom: -30%;
    left: 40%;
    color: #bbb;
}
</style>
