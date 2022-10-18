<script lang="ts">
    import { onMount } from "svelte";
    import { getChampions, getLatestVersion } from "../Services/Api";
    import Filters from "./Filters.svelte";
    import ChampionCard from "./ChampionCard.svelte";
    import { champions, ver } from "../Services/Store";
    import { setUpParams } from "../Services/utils";
    import PopUp from "./PopUp.svelte";
    import type { champion } from "../Models/champion";

    let displayList = false;

    onMount(async () => {
        $ver = await getLatestVersion();
        $champions = await getChampions($ver);
        setUpParams();
        /* $champions.forEach((champ: champion) => {
            let str = `name: ${champ.name}, partype: ${champ.partype}`;
            console.log(str);
        }); */
    });
</script>

<div class="container mt-3">
    <Filters bind:displayList />
    <div class="d-flex flex-wrap">
        {#if $champions !== undefined}
            {#each $champions as champion}
                <ChampionCard {champion} {displayList} />
            {/each}
            <PopUp />
        {/if}
    </div>
</div>
