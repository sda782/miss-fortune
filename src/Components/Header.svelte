<script lang="ts">
    import { username } from "../Services/Store";
    import InputField from "./ChampionMastery/InputField.svelte";

</script>

<div class="border-bottom border-5 box d-flex">
    <div class="container">
        <h1 class="pt-3 pb-1 rounded-3 w-50 text-center">
            <em>Fortune doesn't favor fools.</em>
        </h1>
        <div class="pb-3">
            <InputField
                inputText="Summoner Name"
                buttonText="Find user"
                bind:inputValue={$username}
                action={() => {}} />
        </div>
    </div>
</div>

<style>
    .box {
        border-color: #d7cfbe !important;
        background-image: url("/mf_splash.png");
        background-size: cover;
        background-position: center 30%;
    }
    h1 {
        margin: 1em 0 1em 0;
        background-color: #07141d;
    }
</style>
