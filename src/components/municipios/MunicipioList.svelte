<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { createEventDispatcher } from "svelte";
  import Swal from "sweetalert2"; // Import SweetAlert2
  import { deleteMunicipio } from "../../api";

  let municipios = [];
  let provincias = [];
  let nome = "";
  let provincia_id = "";
  let editing = false;
  let currentMunicipioId = null;
  let page;
  let limit;
  let totalCount;

  const dispatch = createEventDispatcher();

  const deleteMunicipality = async (id) => {
    // SweetAlert2 confirmation dialog
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!isConfirmed) {
      return; // Stop the deletion process if the user cancels
    }

    try {
      await deleteMunicipio(id);

      // SweetAlert success dialog with 1-second timeout
      Swal.fire({
        title: "Deleted!",
        text: "The municipio has been deleted.",
        icon: "success",
        timer: 1000, // Dialog will automatically close after 1 second
        showConfirmButton: false, // Hide the confirm button
      });

      fetchMunicipalities();
    } catch (error) {
      Swal.fire("Error!", "There was an error deleting the province.", "error");
    }
  };

  // Dispatch an event to change the page
  const changePage = (newPage) => {
    dispatch("changePage", newPage);
  };

  // Dispatch an event to change the limit
  const changeLimit = (newLimit) => {
    dispatch("changeLimit", newLimit);
  };
</script>

<div class="table-container">
  <!-- Municipios Table -->
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Provincia</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each municipios as municipio}
        <tr>
          <td>{municipio.nome}</td>
          <td>{municipio.nome}</td>
          <td class="actions">
            <button on:click={() => deleteMunicipality(municipio.id)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Pagination controls -->
  <div class="pagination-controls">
    <button on:click={() => changePage(page - 1)} disabled={page <= 1}>Previous</button>
    <span>Page {page} of {Math.ceil(totalCount / limit)}</span>
    <button on:click={() => changePage(page + 1)} disabled={page >= Math.ceil(totalCount / limit)}>Next</button>

    <!-- Limit controls -->
    <select on:change={(e) => changeLimit(parseInt(e.target.value))} bind:value={limit}>
      <option value="5">5 per page</option>
      <option value="10">10 per page</option>
      <option value="20">20 per page</option>
      <option value="50">50 per page</option>
    </select>
  </div>
</div>
