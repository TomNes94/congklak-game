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
    background-color: rgb(121, 89, 55);
    border-radius: 38px;
    display: inline-block;
    cursor: pointer;
    box-shadow: inset 1px 1px 5px 1px rgba(0, 0, 0, 0.45);

    &:hover {
        background-color: rgb(99, 73, 45);
    }

    @media (max-width: 480px) {
        height: 25px;
        width: 100px;
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
    @media (max-width: 480px) {
        bottom: -70%;
    }
}
</style>
