<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import ChampionMastery from "./ChampionMastery/ChampionMastery.svelte";
    import Challenges from "./Challenges/Challenges.svelte";
</script>

<Router>
    <div class="container mt-3">
        <Route path="/" component={ChampionMastery} />
        <Route path="/Challenges" component={Challenges} />
    </div>
</Router>
