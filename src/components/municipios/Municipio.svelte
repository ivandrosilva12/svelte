<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let municipios = [];
    let provinciaOptions = [];  // Store the available provincias
    let newMunicipio = '';
    let newProvinciaId = '';
    let editingMunicipio = null;
  
    // Fetch municipios and provincias
    const fetchMunicipios = async () => {
      try {
        const municipiosResponse = await axios.get('https://api.bisno.pro/api/municipios');
        municipios = municipiosResponse.data;
      } catch (error) {
        console.error("Error fetching municipios", error);
      }
    };
  
    const fetchProvincias = async () => {
      try {
        const provinciasResponse = await axios.get('https://api.bisno.pro/api/provincias');
        provinciaOptions = provinciasResponse.data;
      } catch (error) {
        console.error("Error fetching provincias", error);
      }
    };
  
    // Add a new municipio
    const addMunicipio = async () => {
      if (!newMunicipio || !newProvinciaId) return;
  
      try {
        const response = await axios.post('https://api.bisno.pro/api/municipios', {
          nome: newMunicipio,
          provincia_id: newProvinciaId
        });
        municipios.push(response.data);
        newMunicipio = '';
        newProvinciaId = '';
      } catch (error) {
        console.error("Error adding municipio", error);
      }
    };
  
    // Start editing an existing municipio
    const startEditing = (municipio) => {
      editingMunicipio = { ...municipio }; // Clone the municipio for editing
    };
  
    // Save the edited municipio
    const saveEdit = async () => {
      if (!editingMunicipio) return;
      
      try {
        const response = await axios.put(`https://api.bisno.pro/api/municipios/${editingMunicipio.id}`, {
          nome: editingMunicipio.nome,
          provincia_id: editingMunicipio.provincia_id
        });
  
        const index = municipios.findIndex(m => m.id === response.data.id);
        municipios[index] = response.data;
        editingMunicipio = null;
      } catch (error) {
        console.error("Error updating municipio", error);
      }
    };
  
    // Cancel editing
    const cancelEdit = () => {
      editingMunicipio = null;
    };
  
    // Delete a municipio
    const deleteMunicipio = async (id) => {
      try {
        const response = await axios.delete(`https://api.bisno.pro/api/municipios/${id}`);
        municipios = municipios.filter(m => m.id !== id);
      } catch (error) {
        console.error("Error deleting municipio", error);
      }
    };
  
    // On mount, fetch municipios and provincias
    onMount(() => {
      fetchMunicipios();
      fetchProvincias();
    });
  </script>
  
  <style>
    .municipio-list {
      margin-top: 20px;
    }
    .municipio-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
    }
    .municipio-item button {
      margin-left: 10px;
    }
  </style>
  
  <h1>Municipios</h1>
  
  <!-- Add New Municipio Form -->
  <div>
    <input type="text" bind:value={newMunicipio} placeholder="Municipio name" />
    <select bind:value={newProvinciaId}>
      <option value="" disabled>Select Provincia</option>
      {#each provinciaOptions as provincia}
        <option value={provincia.id}>{provincia.nome}</option>
      {/each}
    </select>
    <button on:click={addMunicipio}>Add Municipio</button>
  </div>
  
  <!-- Edit Municipio Form (only shows when editing) -->
  {#if editingMunicipio}
    <div>
      <h3>Edit Municipio</h3>
      <input type="text" bind:value={editingMunicipio.nome} />
      <select bind:value={editingMunicipio.provincia_id}>
        {#each provinciaOptions as provincia}
          <option value={provincia.id}>{provincia.nome}</option>
        {/each}
      </select>
      <button on:click={saveEdit}>Save</button>
      <button on:click={cancelEdit}>Cancel</button>
    </div>
  {/if}
  
  <!-- List of Municipios -->
  <div class="municipio-list">
    {#each municipios as municipio}
      <div class="municipio-item">
        <span>{municipio.nome} ({municipio.provincia_nome})</span>
        <button on:click={() => startEditing(municipio)}>Edit</button>
        <button on:click={() => deleteMunicipio(municipio.id)}>Delete</button>
      </div>
    {/each}
  </div>
  