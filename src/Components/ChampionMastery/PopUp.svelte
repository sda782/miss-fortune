<script lang="ts">
    import {
        selectedChampion,
        selectedChampionMastery,
        ver,
    } from "../../Services/Store";
    import { getTimeStamp } from "../../Services/utils";
    import SplashArt from "./SplashArt.svelte";

    const modalClose = () => {
        $selectedChampion = undefined;
    };
</script>

{#if $selectedChampion !== undefined}
    <div class="modal" id="championPopup" tabindex="-1" role="dialog">
        <div class="modal-dialog rounded" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h2 class="modal-title" id="sampleModalLabel">
                            {$selectedChampion.name}
                        </h2>
                        <h5>
                            <em>{$selectedChampion.title}</em>
                        </h5>
                    </div>
                    <img
                        src="https://ddragon.leagueoflegends.com/cdn/{$ver}/img/champion/{$selectedChampion.id}.png"
                        alt={$selectedChampion.name}
                        width="120"
                        height="120" />
                </div>
                <div class="modal-body">
                    <p>{$selectedChampion.blurb}</p>
                </div>
                <div class="modal-body">
                    {#if $selectedChampionMastery !== undefined}
                        <div>
                            <p>
                                Mastery lvl: {$selectedChampionMastery.championLevel}
                            </p>
                            <span>
                                <i class="bi bi-clock" />
                                {getTimeStamp(
                                    $selectedChampionMastery.lastPlayTime
                                ).toDateString()}
                            </span>
                        </div>
                    {/if}
                </div>
                <div class="modal-body">
                    <SplashArt />
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary-outline me-2"
                        style="max-height: 2em; color:rgb(215,207,190);"
                        data-dismiss="modal"
                        on:click={modalClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    @media screen and (min-width: 768px) {
        .modal:before {
            display: inline-block;
            vertical-align: middle;
            content: " ";
            height: 100%;
        }
    }

    .modal {
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
        text-align: center;
    }

    .modal-content {
        background: linear-gradient(to bottom, #07141d, #0a3040) fixed no-repeat;
        color: #d7cfbe;
        font-family: "Gulzar", serif;
    }

    .modal-dialog {
        display: inline-block;
        text-align: left;
        vertical-align: middle;
    }
</style>
