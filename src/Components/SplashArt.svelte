<script lang="ts">
    import type { champion, skin } from "../Models/champion";
    import { getChampion } from "../Services/Api";
    import { selectedChampion, ver } from "../Services/Store";

    let champion: champion | null = null;
    let skins: skin[] = [];

    const getSkins = async () => {
        champion = await getChampion($selectedChampion.id, $ver);
        skins = champion.skins;
    };
</script>

<button
    on:click={getSkins}
    class="btn btn-secondary-outline me-2"
    style="max-height: 2em; color:rgb(215,207,190);">get skin art</button>

<div>
    {#each skins as skin}
        <img
            width="100%"
            src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champion.id}_{skin.num}.jpg"
            alt="skins" />
        <p class="text-center">{skin.name}</p>
    {/each}
</div>
