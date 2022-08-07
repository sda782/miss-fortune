<script lang="ts">
    import {searchUser} from "../Services/userManager";
    import {searchChampion} from "../Services/championManager";
    import type {championMastery} from "../Models/champion";
    import {champion} from "../Models/champion";
    import {onMount} from "svelte";
    import InputField from "./InputField.svelte";

    let username: string
    let targetChampionName: string
    export let champMastery: championMastery[]
    export let champions: champion[]
    export let displayList: boolean

    onMount(async () => {
        setUpParams()
    })
    const setUpParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
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

<div class="d-flex">
    <InputField inputText="Summoner Name" buttonText="Find user" bind:inputValue={username} action={async()=>{
        champMastery = await searchUser(username)
        champions = [...champions];
    }}/>
    <InputField inputText="Champion Name" buttonText="Find champion" bind:inputValue={targetChampionName} action={async()=>{
        champions = searchChampion(champions, targetChampionName)
    }}/>
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