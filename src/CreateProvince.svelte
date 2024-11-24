<script>
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';

  const dispatch = createEventDispatcher();

  let nome = '';

  const createProvince = async () => {
    try {
      const provinceData = { nome };
      await axios.post('https://api.bisno.pro/api/provincias', provinceData);
      dispatch('fetchProvincias');
      nome = '';
    } catch (error) {
      alert('Error creating province');
    }
  };
</script>

<div>
  <h2>Create Province</h2>
  <input type="text" bind:value={nome} placeholder="Province Name" />
  <button on:click={createProvince}>Create</button>
</div>
