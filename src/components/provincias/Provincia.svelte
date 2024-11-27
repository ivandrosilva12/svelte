<script>
  import { onMount } from 'svelte';
  import Provincias from './Provincia.svelte';
  import CreateProvincia from './CreateProvincia.svelte';
  import UpdateProvincia from './UpdateProvincia.svelte';

  let showCreateForm = false;
  let selectedProvinciaId = null;

  function handleProvinceCreated(event) {
    showCreateForm = false;
  }

  function handleProvinceUpdated() {
    selectedProvinciaId = null;
  }
</script>

<main>
  <h1>Provincia Management</h1>

  <button on:click={() => (showCreateForm = !showCreateForm)}>
    {showCreateForm ? 'Cancel' : 'Create New Provincia'}
  </button>

  {#if showCreateForm}
    <CreateProvincia on:provinceCreated={handleProvinceCreated} />
  {/if}

  {#if selectedProvinciaId}
    <UpdateProvincia 
      provinciaId={selectedProvinciaId} 
      on:provinceUpdated={handleProvinceUpdated} 
    />
  {/if}

  <Provincias on:provinceSelected={id => (selectedProvinciaId = id)} />
</main>
