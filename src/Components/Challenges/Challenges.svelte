<script lang="ts">
    import { challenges } from "../../Services/Store";
</script>

<div>
    {#if $challenges}
        <span>{$challenges.totalPoints.level}</span>
        <div class="d-flex flex-wrap">
            {#each $challenges.challenges as ch}
                <div class="border rounded m-3 px-5 pt-3 w-[100px]">
                    <p>{ch.challengeId}</p>
                    <p>{ch.level}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>
