<script lang="ts">
    import lock from "../../assets/lock.png";
    import type { champion } from "../../Models/champion";
    import { showLetter } from "../../Services/utils";
    import {
        getMasteryForChampion,
        getMasteryLvl,
        hasChest,
    } from "../../Services/championManager";
    import {
        champMastery,
        ver,
        selectedChampion,
        selectedChampionMastery,
    } from "../../Services/Store";

    export let champion: champion;
    export let displayList: boolean;

    const selectChampion = (champion: champion) => {
        $selectedChampion = champion;
        if ($champMastery !== undefined) {
            $selectedChampionMastery = getMasteryForChampion(
                champion,
                $champMastery
            );
        }
        console.log($selectedChampion);
    };
</script>

{#if champion.display}
    {#if showLetter(champion.name) && displayList}
        <div style="min-width:100%;" class="mt-3 ms-2 ps-2 text-left fs-3">
            <span>{champion.name[0]}</span>
        </div>
    {/if}
    <div
        tabindex={1}
        role="button"
        style="max-width: 120px;"
        class="mt-3 ms-2"
        on:keypress={(e) => {
            if (e.key !== "Enter") return;
            selectChampion(champion);
        }}
        on:click={() => {
            selectChampion(champion);
        }}>
        <img
            src="https://ddragon.leagueoflegends.com/cdn/{$ver}/img/champion/{champion.id}.png"
            alt={champion.name}
            width="120"
            height="120" />
        {#if $champMastery !== undefined}
            {#if hasChest(champion, $champMastery)}
                <div style="position:absolute;">
                    <img
                        width="32"
                        height="32"
                        class="overlay"
                        src={lock}
                        alt="" />
                </div>
            {/if}
            <div style="position:absolute;">
                <span class="mastery-lvl fs-2">
                    {getMasteryLvl(champion, $champMastery)}
                </span>
            </div>
        {/if}
        <h5 class="text-center mt-2">{champion.name}</h5>
    </div>
{/if}

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
