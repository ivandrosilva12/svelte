<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { fetchAllProvincias, createMunicipio } from "../../api";

  let provincias = [];
  let nome = "";
  let provincia_id = "";

  // Fetch all provincias
  const fetchProvinces = async () => {
    try {
      const response = await fetchAllProvincias();
      provincias = response.data.items;
    } catch (error) {
      console.error("Error fetching provincias:", error);
    }
  };

  // Create new municipio
  const createMunicipality = async () => {
    if (!nome || !provincia_id) {
      alert("Please provide both the municipio name and provincia.");
      return;
    }
    try {
      const response = await createMunicipio(nome, provincia_id);
      alert("Municipio created successfully");
      fetchMunicipios();
      resetForm();
    } catch (error) {
      console.error("Error creating municipio:", error);
      alert("Error creating municipio");
    }
  };

  // Reset form fields
  const resetForm = () => {
    nome = "";
    provincia_id = "";
    currentMunicipioId = null;
  };
</script>

<div class="create-container">
  <h2>Create Municipio</h2>
  <input type="text" bind:value={nome} placeholder="Municipio Name" />
  <!-- Provincia Combobox (Dropdown) -->
  <select bind:value={provincia_id} required>
    <option value="">Select Provincia</option>
    {#each provincias as provincia}
      <option value={provincia.id}>{provincia.nome}</option>
    {/each}
  </select>
  <button on:click={createMunicipality}>Create</button>
</div>
