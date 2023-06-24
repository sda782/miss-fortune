<script lang="ts">
    import { searchChampion } from "../../Services/championManager";
    import InputField from "./InputField.svelte";
    import { champions, targetChampionName } from "../../Services/Store";

    export let displayList: boolean;
</script>

<div class="d-flex flex-md-row flex-column">
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
