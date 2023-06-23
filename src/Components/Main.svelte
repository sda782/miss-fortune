<script lang="ts">
    import Router from "svelte-spa-router";
    import ChampionMastery from "./ChampionMastery/ChampionMastery.svelte";
    import Challenges from "./Challenges/Challenges.svelte";
    const routes = {
        "/": ChampionMastery,
        "/Challenges": Challenges,
        "/Challenges/*": Challenges,
    };
</script>

<Router {routes} />
