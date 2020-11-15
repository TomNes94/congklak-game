<template lang="pug">
.notification(v-if="error.show")
    img(:src="require('../assets/error.png')")
    slot.message-content   
</template>

<script>
export default {
    props: ["active"],
    data() {
        return {
            error: {
                show: false
            }
        };
    },
    watch: {
        active() {
            this.error.show = true;
            setTimeout(() => {
                this.error.show = false;
            }, 5000);
        }
    }
};
</script>

<style lang="scss" scoped>
.notification {
    display: flex;
    align-items: center;
    position: fixed;
    left: 40%;
    top: 5%;
    width: 30vw;
    max-width: 300px;
    background-color: #d89d99;
    padding: 15px;
    img {
        width: 25px;
        height: 25px;
        margin: 5px 15px 5px 5px;
    }
}
</style>
