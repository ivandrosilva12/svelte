<script>
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';

  export let provincias = [];
  export let fetchProvincias;
  export let page;
  export let limit;
  export let totalCount;

  const dispatch = createEventDispatcher();

  const deleteProvince = async (id) => {
    // Ask the user for confirmation before proceeding with the deletion
    const isConfirmed = window.confirm('Are you sure you want to delete this province?');
    if (!isConfirmed) {
      return; // Stop the deletion process if the user cancels
    }

    try {
      await axios.delete(`https://api.bisno.pro/api/provincias/${id}`);
      fetchProvincias(); // Re-fetch provinces after deletion
    } catch (error) {
      alert('Error deleting province');
    }
  };

  // Dispatch an event to change the page
  const changePage = (newPage) => {
    dispatch('changePage', newPage);
  };

  // Dispatch an event to change the limit
  const changeLimit = (newLimit) => {
    dispatch('changeLimit', newLimit);
  };
</script>

<ul>
{#each provincias as provincia}
  <li>
    {provincia.nome} 
    <button on:click={() => deleteProvince(provincia.id)}>Delete</button>
  </li>
{/each}
</ul>

<!-- Pagination controls -->
<div>
<button on:click={() => changePage(page - 1)} disabled={page <= 1}>Previous</button>
<span>Page {page} of {Math.ceil(totalCount / limit)}</span>
<button on:click={() => changePage(page + 1)} disabled={page >= Math.ceil(totalCount / limit)}>Next</button>

<!-- Limit controls -->
<select on:change={(e) => changeLimit(parseInt(e.target.value))} bind:value={limit}>
  <option value="10">10 per page</option>
  <option value="20">20 per page</option>
  <option value="50">50 per page</option>
</select>
</div>

<style>
button {
  margin: 5px;
}

select {
  margin-left: 10px;
}
</style>
