<script lang="ts">
    import { onMount } from "svelte";
    import type { champion, championMastery } from "../Models/champion.js";
    import {
        getAccountIdsByName,
        getChampions,
        getChampionsMastery,
        getLastestVersion,
    } from "../Services/Api.js";
    let champions: champion[];
    let ver;
    let username = "";
    let champMastery: championMastery[] = undefined;
    onMount(async () => {
        ver = await getLastestVersion();
        champions = await getChampions(ver);
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("name")) {
            username = urlParams.get("name");
            search();
        }
    });
    const search = async (): Promise<void> => {
        const ids = await getAccountIdsByName(username);
        champMastery = await getChampionsMastery(ids.id);
        champions = [...champions];
    };
    const hasChest = (champion): boolean => {
        let champ = champMastery.find(
            (champ) => champ.championId.toString() == champion.key
        );
        if (champ === undefined) return false;
        return champ.chestGranted;
    };
</script>

<div class="container mt-3">
    <div class="d-flex w-25">
        <input
            placeholder="Summoner Name"
            type="text"
            class="form-control-sm text-center me-2"
            style="max-height:2em; background:#d7cfbe;"
            bind:value={username}
        />
        <button
            class="btn btn-secondary-outline"
            style="max-height: 2em; color:#d7cfbe;"
            on:click={search}>Find</button
        >
    </div>
    <div class="d-flex flex-wrap">
        {#if champions !== undefined}
            {#each champions as champion}
                <div style="max-width: 120px;" class="mt-3 ms-2 ">
                    <img
                        src="https://ddragon.leagueoflegends.com/cdn/{ver}/img/champion/{champion.id}.png"
                        alt={champion.name}
                    />
                    <div style="position:absolute;">
                        {#if champMastery !== undefined}
                            {#if hasChest(champion)}
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
                        {/if}
                    </div>
                    <h5 class="text-center mt-2">{champion.name}</h5>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .overlay {
        position: relative;
        top: -125px;
        left: -5px;
    }
</style>
