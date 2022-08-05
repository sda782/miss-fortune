<script lang="ts">
    import { onMount } from "svelte";
    import type { champion, championMastery } from "../Models/champion.js";
    import {
        getAccountIdsByName,
        getChampions,
        getChampionsMastery,
        getLatestVersion,
    } from "../Services/Api.js";
    let urlParams: URLSearchParams;
    let champions: champion[];
    let ver: string;
    let username = "";
    let targetChampionName = "";
    let champMastery: championMastery[] = undefined;
    let lastGroupLetter = "";
    let displayList = false;

    onMount(async () => {
        ver = await getLatestVersion();
        champions = await getChampions(ver);
        urlParams = new URLSearchParams(window.location.search);
        urlParams.forEach((param) => {
            console.log(param);
        });
        if (urlParams.has("name")) {
            username = urlParams.get("name");
            await searchUser();
        }
        if (urlParams.has("champion")) {
            targetChampionName = urlParams.get("champion");
            searchChampion();
        }
    });

    const searchUser = async (): Promise<void> => {
        const ids = await getAccountIdsByName(username);
        champMastery = await getChampionsMastery(ids.id);
        champions = [...champions];
    };

    const searchChampion = (): void => {
        champions.forEach((champ: champion) => {
            champ.display = champ.name
                .toLowerCase()
                .startsWith(targetChampionName.toLowerCase());
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
    const getMasteryLvl = (champion: champion): string => {
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
        <input
            placeholder="Champion Name"
            type="text"
            class="form-control-sm text-center me-2"
            style="max-height:2em; background:#d7cfbe;"
            bind:value={targetChampionName}
        />
        <button
            class="btn btn-secondary-outline me-2"
            style="max-height: 2em; color:#d7cfbe;"
            on:click={searchChampion}>Find champion</button
        >

        <div class="d-flex pt-2">
            <label
                class="form-check-label me-2"
                style="color: #d7cfbe; border:none"
                for="list">Show List View</label
            >
            <input
                class="form-check-input"
                type="checkbox"
                id="list"
                bind:checked={displayList}
            />
        </div>
    </div>
    <!--suppress JSUnresolvedVariable -->
    <div class="d-flex flex-wrap">
        {#if champions !== undefined}
            {#each champions as champion}
                {#if champion.display}
                    {#if showLetter(champion.name) && displayList}
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
                                    <!--suppress CheckImageSize -->
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
                                <span class="mastery-lvl fs-2">
                                    {getMasteryLvl(champion)}
                                </span>
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
        top: -35px;
        left: 95px;
    }
</style>
