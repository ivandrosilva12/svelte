<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import axios from 'axios';
  
    const dispatch = createEventDispatcher();
    export let provinciaId;
  
    let nome = '';
  
    async function fetchProvince() {
      try {
        const response = await axios.get(`/api/provincias/${provinciaId}`);
        nome = response.data.nome;
      } catch (error) {
        console.error('Error fetching provincia:', error);
      }
    }
  
    async function updateProvince() {
      try {
        await axios.put(`/api/provincias/${provinciaId}`, { nome });
        dispatch('provinceUpdated');  // Notify parent component
      } catch (error) {
        console.error('Error updating provincia:', error);
      }
    }
  
    onMount(fetchProvince);  // Fetch province details when component mounts
  </script>
  
  <h2>Update Provincia</h2>
  
  <form on:submit|preventDefault={updateProvince}>
    <label for="nome">Name</label>
    <input type="text" id="nome" bind:value={nome} required />
  
    <button type="submit">Update</button>
  </form>
  