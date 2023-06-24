<script lang="ts">
    import { onMount } from "svelte";
    import { getChampions, getLatestVersion } from "../../Services/Api";
    import Filters from "./Filters.svelte";
    import ChampionCard from "./ChampionCard.svelte";
    import { champions, username, ver } from "../../Services/Store";
    import { setUpParams } from "../../Services/utils";
    import PopUp from "./PopUp.svelte";

    let displayList = false;

    onMount(async () => {
        $ver = await getLatestVersion();
        $champions = await getChampions($ver);
        setUpParams();
        
    });

    $: $username
</script>

<Filters bind:displayList />
<div class="d-flex flex-wrap">
    {#if $champions !== undefined}
        {#each $champions as champion}
            <ChampionCard {champion} {displayList} />
        {/each}
        <PopUp />
    {/if}
</div>
