<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  let provincias = [];
  let page = 1;
  let limit = 10;
  let totalCount = 0;
  let totalPages = 1;

  // Fetch provinces from the API with pagination
  async function fetchProvincias() {
    try {
      const response = await axios.get('/api/provincias', {
        params: { page, limit },
      });

      provincias = response.data.items;
      totalCount = response.data.total_count;
      totalPages = Math.ceil(totalCount / limit);
    } catch (error) {
      console.error('Error fetching provincias:', error);
    }
  }

  // Pagination handlers
  function nextPage() {
    if (page < totalPages) {
      page += 1;
      fetchProvincias();
    }
  }

  function prevPage() {
    if (page > 1) {
      page -= 1;
      fetchProvincias();
    }
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this province?')) {
      axios.delete(`/api/provincias/${id}`).then(() => {
        fetchProvincias();  // Refresh the list after deletion
      }).catch(error => {
        console.error('Error deleting provincia:', error);
      });
    }
  }

  onMount(fetchProvincias);  // Fetch provinces when the component mounts
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }

  .pagination button {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
  }
</style>

<h2>Provincias</h2>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each provincias as provincia}
      <tr>
        <td>{provincia.id}</td>
        <td>{provincia.nome}</td>
        <td>
          <button on:click={() => handleDelete(provincia.id)}>Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<div class="pagination">
  <button on:click={prevPage} disabled={page === 1}>Previous</button>
  <span>Page {page} of {totalPages}</span>
  <button on:click={nextPage} disabled={page === totalPages}>Next</button>
</div>
