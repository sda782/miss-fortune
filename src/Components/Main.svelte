<script lang="ts">
    import { onMount } from "svelte";
    import type { champion, championState } from "../Models/champion.js";
    import { getChampions, getLastestVersion } from "../Services/Api.js";
    import { cheststates } from "../Services/store.js";
    let champions: champion[];
    let ver;
    onMount(async () => {
        ver = await getLastestVersion();
        champions = await getChampions(ver);
        if ($cheststates.length === 0) {
            champions.forEach((val) => {
                let temp: championState = {
                    name: val.id,
                    chestState: "locked",
                };
                $cheststates = [...$cheststates, temp];
            });
        }
        console.log($cheststates);
    });
    const toggleChest = (champion): void => {
        let champ = $cheststates.find((el) => el.name == champion);
        console.log(champ);
        champ.chestState =
            champ.chestState === "locked" ? "unlocked" : "locked";
        $cheststates = [...$cheststates];
    };
</script>

<div class="d-flex flex-wrap container">
    {#if champions !== undefined}
        {#each champions as champion}
            <div style="max-width: 120px;" class="mt-3 ms-2 ">
                <img
                    on:click={() => toggleChest(champion.id)}
                    src="http://ddragon.leagueoflegends.com/cdn/{ver}/img/champion/{champion.id}.png"
                    alt={champion.name}
                />
                <div style="position:absolute;">
                    {#if $cheststates.find((el) => el.name == champion.id).chestState == "locked"}
                        <div />
                    {:else}
                        <img
                            width="32"
                            height="33"
                            class="overlay"
                            src="./lock.png"
                            alt=""
                        />
                    {/if}
                </div>
                <h5 class="text-center mt-2">{champion.name}</h5>
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
