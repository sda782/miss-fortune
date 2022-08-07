<script lang="ts">
    export let inputValue: string
    export let inputText: string
    export let buttonText: string
    export let action
</script>

<input
        placeholder={inputText}
        type="text"
        class="form-control-sm text-center me-2"
        style="max-height:2em; background:rgb(215,207,190);"
        bind:value={inputValue}
/>
<button
        class="btn btn-secondary-outline me-2"
        style="max-height: 2em; color:rgb(215,207,190);"
        on:click={ action()}>{buttonText}
</button>