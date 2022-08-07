<script lang="ts">
    import {onMount} from "svelte";
    import {getChampions, getLatestVersion} from "../Services/Api";
    import Filters from "./Filters.svelte";
    import ChampionCard from "./ChampionCard.svelte";
    import {champions, ver} from "../Services/Store";

    let displayList = false;

    onMount(async () => {
        $ver = await getLatestVersion();
        $champions = await getChampions($ver);
    });

</script>
<div class="container mt-3">
    <Filters bind:displayList={displayList}/>
    <div class="d-flex flex-wrap">
        {#if $champions !== undefined}
            {#each $champions as champion}
                <ChampionCard {champion} {displayList}/>
            {/each}
        {/if}
    </div>
</div>

