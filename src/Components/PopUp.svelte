<script lang="ts">
    import {
        selectedChampion,
        selectedChampionMastery,
    } from "../Services/Store";
    import { getTimeStamp } from "../Services/utils";

    const modalClose = () => {
        $selectedChampion = undefined;
    };
</script>

{#if $selectedChampion !== undefined}
    <div
        class="modal"
        id="sampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="sampleModalLabel"
        aria-hidden={false}
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sampleModalLabel">
                        {$selectedChampion.name}
                    </h5>
                </div>
                <div class="modal-body">
                    <p>{$selectedChampion.blurb}</p>
                </div>
                {#if $selectedChampionMastery !== undefined}
                    <div class="modal-body">
                        <p>
                            Last Played:
                            {getTimeStamp(
                                $selectedChampionMastery.lastPlayTime
                            ).toDateString()}
                        </p>
                    </div>
                {/if}
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary-outline me-2"
                        style="max-height: 2em; color:rgb(215,207,190);"
                        data-dismiss="modal"
                        on:click={modalClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        display: block;
    }
    .modal-content {
        background: linear-gradient(to bottom, #07141d, #0a3040) fixed no-repeat;
        color: #d7cfbe;
        font-family: "Gulzar", serif;
    }
</style>
