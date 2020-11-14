<template lang="pug">
span.circle
    img.circle-small(:src="require('../assets/shell.png')" v-if="isFilled")
    span.text-number-stones {{nrStones}}
</template>

<script>
export default {
    name: "LargeHole",
    props: ["isFilled", "nrStones"]
};
</script>

<style lang="scss" scoped>
.circle {
    position: relative;
    height: 75px;
    width: 300px;
    background-color: #bbb;
    border-radius: 38px;
    display: inline-block;
    cursor: pointer;

    &:hover {
        background-color: grey;
    }
}

.circle-small {
    position: relative;
    top: 12%;
    left: 40%;
    height: 75%;
    width: 20%;
    display: inline-block;
    cursor: pointer;
}

.text-number-stones {
    position: absolute;
    bottom: -30%;
    left: 50%;
    color: #bbb;
}
</style>
