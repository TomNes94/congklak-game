<template lang="pug">
.container
	h1 Playing Mancala is easy!
	.body-step
		p Mancala is a board game for two players. Other names include Congklak, Dakon, Sungka and Oware. Versions of the game date back to the 7th century and evidence suggests the game existed in Ancient Egypt. It is among the oldest known games to still be widely played today.


</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
    color: white;
    flex-direction: column;
    display: flex;
    align-items: center;
    padding: 20px;
    p {
        font-size: 1.5rem;
        @media (max-width: 480px) {
            font-size: 1rem;
        }
    }
}
.body-step {
    width: 60%;
    flex-direction: column;
    display: flex;
    align-items: center;
}
</style>
