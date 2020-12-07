<template lang="pug">
.modal(v-if="active")
    .sk-chase
        .sk-chase-dot
        .sk-chase-dot
        .sk-chase-dot
        .sk-chase-dot
        .sk-chase-dot
        .sk-chase-dot
    span.text-loading Waiting for player...
    .button-white#copy-button(:data-clipboard-text="roomId") Copy code
    message(:active = "showMessage")
        span {{message}}
</template>

<script>
import Message from "./Message";

import ClipboardJS from "clipboard";
export default {
    props: ["active", "roomId"],
    mounted() {
        const clipboard = new ClipboardJS(".button-white");
        clipboard.on("success", () => {
            this.showMessage = true;
            this.message = "Code copied succesfully!";
        });
    },
    computed: {
        whatsappLink() {
            return `whatsapp://send?text=${encodeURIComponent(`Join my game at https://mancala.tomvannes.dev/ with this code: ${this.roomId}`)}`;
        }
    },
    data() {
        return {
            showMessage: false,
            message: null
        };
    },
    components: {
        Message
    }
};
</script>

<style lang="scss" scoped>
$spinner-color: #eb7207;
.modal {
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(44, 44, 44, 0.7);
    z-index: 100;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.text-loading {
    margin: 20px;
    color: white;
    font-size: 1.2rem;
    @media (max-width: 480px) {
        font-size: 1rem;
    }
}

.button-white {
    background-color: rgb(213, 213, 213);
    padding: 20px 40px;
    color: black;
    font-size: 1.75rem;
    @media (max-width: 480px) {
        padding: 10px 20px;
        font-size: 0.7rem;
    }
    border-radius: 20px;
    cursor: pointer;
    border: none;
    &:hover {
        background-color: rgb(197, 197, 197);
    }
}
.sk-chase {
    width: 40px;
    height: 40px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: #fff;
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
    animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
    animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
}

@keyframes sk-chase {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot {
    80%,
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot-before {
    50% {
        transform: scale(0.4);
    }
    100%,
    0% {
        transform: scale(1);
    }
}
</style>
