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
    let championDisplay: champion[];
    let ver: string;
    let username = "";
    let targetChampionName: string;
    let champMastery: championMastery[] = undefined;

    onMount(async () => {
        ver = await getLastestVersion();
        champions = await getChampions(ver);
        championDisplay = champions;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("name")) {
            username = urlParams.get("name");
            searchUser();
        }
    });

    const searchUser = async (): Promise<void> => {
        const ids = await getAccountIdsByName(username);
        champMastery = await getChampionsMastery(ids.id);
        champions = [...champions];
    };

    const searchChampion = (): void => {
        championDisplay = champions.filter((champ) => {
            if (
                champ.name
                    .toLowerCase()
                    .startsWith(targetChampionName.toLowerCase())
            )
                return champ;
        });
    };

    const hasChest = (champion: champion): boolean => {
        let champ = champMastery.find(
            (champ) => champ.championId.toString() == champion.key
        );
        if (champ === undefined) return false;
        return champ.chestGranted;
    };
</script>

<div class="container mt-3">
    <div class="d-flex">
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
                on:click={searchUser}>Find user</button
            >
        </div>
        <div class="d-flex w-25">
            <input
                placeholder="Champion Name"
                type="text"
                class="form-control-sm text-center me-2"
                style="max-height:2em; background:#d7cfbe;"
                bind:value={targetChampionName}
                on:change={searchChampion}
            />
        </div>
    </div>
    <div class="d-flex flex-wrap">
        {#if championDisplay !== undefined}
            {#each championDisplay as champion}
                <div style="max-width: 120px;" class="mt-3 ms-2 ">
                    <img
                        src="https://ddragon.leagueoflegends.com/cdn/{ver}/img/champion/{champion.id}.png"
                        alt={champion.name}
                    />
                    <div style="position:absolute;">
                        {#if champMastery !== undefined}
                            {#if hasChest(champion)}
                                <img
                                    width="43"
                                    height="44"
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
