<script lang="ts">
    import {onMount} from "svelte";
    import type {champion, championMastery} from "../Models/champion.js";
    import {getChampions, getLatestVersion} from "../Services/Api";
    import Filters from "./Filters.svelte";
    import ChampionCard from "./ChampionCard.svelte";

    let champions: champion[];
    let champMastery: championMastery[] = undefined;
    let ver: string
    let displayList = false;

    onMount(async () => {
        ver = await getLatestVersion();
        champions = await getChampions(ver);
    });

</script>
<div class="container mt-3">
    <Filters bind:displayList={displayList} bind:champions={champions} bind:champMastery={champMastery}/>
    <div class="d-flex flex-wrap">
        {#if champions !== undefined}
            {#each champions as champion}
                <ChampionCard {champion} {champMastery} {ver} {displayList}/>
            {/each}
        {/if}
    </div>
</div>

