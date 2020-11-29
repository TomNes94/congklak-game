<template lang="pug">
span.circle(:class="{active}" @click="onClickHandler")
    img.circle-small(:src="require('../assets/shell.png')" v-if="isFilled")
    span.text-number-stones {{nrStones}}
</template>

<script>
export default {
    name: "Hole",
    props: ["isFilled", "nrStones", "index", "player", "active"],
    methods: {
        onClickHandler(e) {
            e.stopPropagation();
            if (this.nrStones > 0) {
                this.$emit("move", { index: this.index, player: this.player });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.circle {
    position: relative;
    height: 75px;
    width: 75px;
    background-color: rgb(121, 89, 55);
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.45);
    &:hover {
        background-color: rgb(99, 73, 45);
    }
    &.active {
        border: 2px rgb(118, 1, 1) solid;
    }
    @media (max-width: 480px) {
        height: 35px;
        width: 35px;
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
    @media (max-width: 480px) {
        bottom: -70%;
    }
}
</style>
