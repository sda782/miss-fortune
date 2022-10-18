<script lang="ts">
    import { searchUser } from "../Services/userManager";
    import { searchChampion } from "../Services/championManager";
    import InputField from "./InputField.svelte";
    import {
        champions,
        champMastery,
        targetChampionName,
        username,
    } from "../Services/Store";
    import { onMount } from "svelte";

    export let displayList: boolean;

    onMount(() => {
        if ($username !== "") {
            getuser();
        }
    });

    const getuser = async () => {
        $champMastery = await searchUser($username);
        $champions = [...$champions];
    };
</script>

<div class="d-flex flex-md-row flex-column">
    <InputField
        inputText="Summoner Name"
        buttonText="Find user"
        bind:inputValue={$username}
        action={getuser} />
    <InputField
        inputText="Champion Name"
        buttonText="Find champion"
        bind:inputValue={$targetChampionName}
        action={async () => {
            $champions = searchChampion($champions, $targetChampionName);
        }} />
    <div class="d-flex pt-2">
        <label
            class="form-check-label me-2"
            style="color: rgb(215,207,190); border:none"
            for="list">Show List View</label>
        <input
            class="form-check-input"
            type="checkbox"
            id="list"
            bind:checked={displayList} />
    </div>
</div>
