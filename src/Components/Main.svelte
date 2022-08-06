<script lang="ts">
    import {onMount} from "svelte";
    import type {champion, championMastery} from "../Models/champion.js";
    import {
        searchChampion,
        hasChest,
        getMasteryLvl
    } from "../Services/championManager";
    import {searchUser} from "../Services/userManager";
    import {showLetter} from "../Services/utils";
    import {getChampions, getLatestVersion} from "../Services/Api";

    let urlParams: URLSearchParams;
    let champions: champion[];
    let champMastery: championMastery[] = undefined;
    let username = "";
    let targetChampionName = "";
    let ver: string
    let displayList = false;

    onMount(async () => {
        ver = await getLatestVersion();
        champions = await getChampions(ver);
        setUpParams()
    });
    const setUpParams = () => {
        urlParams = new URLSearchParams(window.location.search);
        urlParams.forEach((val, key) => {
            switch (key) {
                case "name":
                    searchUser(val).then(() => {
                        champions = [...champions]
                    });
                    username = val
                    break
                case "champion":
                    searchChampion(champions, val)
                    targetChampionName = val
                    break
            }
        })
    }
</script>

<div class="container mt-3">
    <div class="d-flex">
        <input
                placeholder="Summoner Name"
                type="text"
                class="form-control-sm text-center me-2"
                style="max-height:2em; background:rgb(215,207,190);"
                bind:value={username}
        />
        <button
                class="btn btn-secondary-outline me-2"
                style="max-height: 2em; color:rgb(215,207,190);"
                on:click={ async ()=>{
                champMastery = await searchUser(username)
                champions = [...champions];
            }}>Find user
        </button>
        <input
                placeholder="Champion Name"
                type="text"
                class="form-control-sm text-center me-2"
                style="max-height:2em; background:rgb(215,207,190);"
                bind:value={targetChampionName}
        />
        <button
                class="btn btn-secondary-outline me-2"
                style="max-height: 2em; color:rgb(215,207,190);"
                on:click={()=>{
                champions = searchChampion(champions, targetChampionName)
            }}>Find champion
        </button
        >

        <div class="d-flex pt-2">
            <label
                    class="form-check-label me-2"
                    style="color: rgb(215,207,190); border:none"
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
    <div class="d-flex flex-wrap">
        {#if champions !== undefined}
            {#each champions as champion}
                {#if champion.display}
                    {#if showLetter(champion.name) && displayList}
                        <div style="min-width:100%;" class="mt-3 ms-2 ps-2 text-left fs-3">
                            <span>{champion.name[0]}</span>
                        </div>
                    {/if}
                    <div style="max-width: 120px;" class="mt-3 ms-2 ">
                        <img src="https://ddragon.leagueoflegends.com/cdn/{ver}/img/champion/{champion.id}.png"
                             alt={champion.name}
                        />
                        {#if champMastery !== undefined}
                            {#if hasChest(champion, champMastery)}
                                <div style="position:absolute;">
                                    <img width="43" height="45" class="overlay" src="/lock.png" alt=""/>
                                </div>
                            {/if}
                            <div style="position:absolute;">
                                <span class="mastery-lvl fs-2">
                                    {getMasteryLvl(champion, champMastery)}
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
