<template lang="pug">
.container
	h1 Playing Mancala is easy!
	.body-step
		p Mancala is a board game for two players. Other names include Congklak, Dakon, Sungka and Oware. Versions of the game date back to the 7th century and evidence suggests the game existed in Ancient Egypt. It is among the oldest known games to still be widely played today.
	h2 Starting a game
	.body-step
		p You can start a game by clicking the Play button on the homepage. From there, choose to either play versus a random player, or create/join a private game. Whenever you create a private game, a code containing 6 characters is displayed. This code can be used to share with your friends.
	h2 Game rules
	.body-step
		p Mancala is a turn-based game. Both players have one side containing 7 small holes and one large hole at the left side. The objective is to get as many stones in the large hole as possible. 
		figure
			img(:src="require('../assets/initial-board.png')" alt="Picture of initial boardstate")
			figcaption Initial board state
		p A move is made by clicking one of the holes on the bottom side. All stones from that hole are remove, and deposited one stone at a time into neighboring holes going clockwise until the stones run out.
		p If there are enough stones to go past the player’s own store, stones are deposited continuing on the other side’s pockets. However, if they encounter the other player’s store, that store is skipped over. If the last stone is deposited in the player’s own store, the player gets another turn.  
		p When all seven small holes on one side are emptied the game ends. Each player will count the number of stones in their large hole. The player who has the most stones in their large hole wins.


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
    figure {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    img {
        width: 100%;
        min-width: 250px;
        max-width: 400px;
        height: auto;
    }
}
.body-step {
    width: 60%;
    flex-direction: column;
    display: flex;
    align-items: center;
}
</style>
