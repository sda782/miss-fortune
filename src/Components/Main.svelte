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
    let ver: string;
    let username = "";
    let targetChampionName: string;
    let champMastery: championMastery[] = undefined;
    let lastGroupLetter: string = "";

    onMount(async () => {
        ver = await getLastestVersion();
        champions = await getChampions(ver);
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
        champions.forEach((champ: champion) => {
            if (
                champ.name
                    .toLowerCase()
                    .startsWith(targetChampionName.toLowerCase())
            )
                champ.display = true;
            else champ.display = false;
        });
        champions = [...champions];
    };

    const hasChest = (champion: champion): boolean => {
        let champ = champMastery.find(
            (champ) => champ.championId.toString() == champion.key
        );
        if (champ === undefined) return false;
        return champ.chestGranted;
    };
    const getMasterylvl = (champion: champion): string => {
        let champ = champMastery.find(
            (champ) => champ.championId.toString() == champion.key
        );
        if (champ === undefined) return "";
        return champ.championLevel.toString();
    };
    const showLetter = (name: string): boolean => {
        if (lastGroupLetter.toLowerCase() !== name.toLowerCase()[0]) {
            lastGroupLetter = name.toLowerCase()[0];
            return true;
        }
        return false;
    };
</script>

<div class="container mt-3">
    <div class="d-flex">
        <div class="d-flex">
            <input
                placeholder="Summoner Name"
                type="text"
                class="form-control-sm text-center me-2"
                style="max-height:2em; background:#d7cfbe;"
                bind:value={username}
            />
            <button
                class="btn btn-secondary-outline me-2"
                style="max-height: 2em; color:#d7cfbe;"
                on:click={searchUser}>Find user</button
            >
        </div>
        <div class="d-flex">
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
        {#if champions !== undefined}
            {#each champions as champion}
                {#if champion.display}
                    {#if showLetter(champion.name)}
                        <div
                            style="min-width:100%;"
                            class="mt-3 ms-2 ps-2 text-left fs-3"
                        >
                            <span>{champion.name[0]}</span>
                        </div>
                    {/if}
                    <div style="max-width: 120px;" class="mt-3 ms-2 ">
                        <img
                            src="https://ddragon.leagueoflegends.com/cdn/{ver}/img/champion/{champion.id}.png"
                            alt={champion.name}
                        />
                        {#if champMastery !== undefined}
                            {#if hasChest(champion)}
                                <div style="position:absolute;">
                                    <img
                                        width="43"
                                        height="44"
                                        class="overlay"
                                        src="/lock.png"
                                        alt=""
                                    />
                                </div>
                            {/if}
                            <div style="position:absolute;">
                                <p class="mastery-lvl">
                                    {getMasterylvl(champion)}
                                </p>
                            </div>
                        {/if}
                        <h5 class="text-center mt-2">{champion.name}</h5>
                    </div>
                {/if}
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
    .mastery-lvl {
        position: relative;
        top: -30px;
        left: 100px;
    }
</style>
