<script lang="ts">
    import { onMount } from "svelte";
    import { getChampions, getLastestVersion } from "../Services/Api.js";
    let champions;
    let ver;
    onMount(async () => {
        ver = await getLastestVersion();
        champions = await getChampions(ver);
        console.log(champions);
    });
    const toggleChest = (champion): void => {};
</script>

<div class="d-flex flex-wrap">
    {#if champions !== undefined}
        {#each Object.keys(champions) as champion}
            <div style="max-width: 120px;" class="m-3">
                <img
                    on:click={() => toggleChest(champion)}
                    src="http://ddragon.leagueoflegends.com/cdn/{ver}/img/champion/{champion}.png"
                    alt={champion}
                />
                <div style="position:absolute;">
                    {#if true}
                        <img
                            width="32"
                            height="33"
                            class="overlay"
                            src="/lock.png"
                            alt=""
                        />
                    {:else}
                        <div />
                    {/if}
                </div>
                <h4 class="text-center">{champion}</h4>
            </div>
        {/each}
    {/if}
</div>

<style>
    .overlay {
        position: relative;
        top: -125px;
        left: -5px;
    }
</style>
