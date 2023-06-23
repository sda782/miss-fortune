<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import ChampionMastery from "./ChampionMastery/ChampionMastery.svelte";
    import Challenges from "./Challenges/Challenges.svelte";
</script>

<Router>
    <Route path="/" component={ChampionMastery} />
    <Route path="/Challenges" component={Challenges} />
</Router>
