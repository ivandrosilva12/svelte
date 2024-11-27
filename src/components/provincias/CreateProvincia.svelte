<script>
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';

  const dispatch = createEventDispatcher();

  let nome = '';

  async function createProvince() {
    try {
      const response = await axios.post('/api/provincias', { nome });
      dispatch('provinceCreated', response.data);  // Notify parent component
      nome = '';  // Reset input
    } catch (error) {
      console.error('Error creating provincia:', error);
    }
  }
</script>

<h2>Create New Provincia</h2>

<form on:submit|preventDefault={createProvince}>
  <label for="nome">Name</label>
  <input type="text" id="nome" bind:value={nome} required />

  <button type="submit">Create</button>
</form>
