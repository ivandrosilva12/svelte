<script>
  import { deleteProvincia } from "../../api";
  import { createEventDispatcher } from "svelte";
  import Swal from "sweetalert2"; // Import SweetAlert2

  export let provincias = [];
  export let fetchProvincias;
  export let page;
  export let limit;
  export let totalCount;

  const dispatch = createEventDispatcher();

  const deleteProvince = async (id) => {
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
      await deleteProvincia(id);

      // SweetAlert success dialog with 1-second timeout
      Swal.fire({
        title: "Deleted!",
        text: "The province has been deleted.",
        icon: "success",
        timer: 1000, // Dialog will automatically close after 1 second
        showConfirmButton: false, // Hide the confirm button
      });

      fetchProvincias(); // Re-fetch provinces after deletion
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

<!-- Data Table -->
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each provincias as provincia}
        <tr>
          <td>{provincia.nome}</td>
          <td>
            <button on:click={() => deleteProvince(provincia.id)}>Delete</button>
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

<style>
  /* Centering the table and pagination */
  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
  }

  table {
    width: 50%; /* Resize the table to be half of the page */
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  button {
    padding: 5px 10px;
    background-color: #ff5555;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #ff3333;
  }

  select {
    margin-left: 10px;
  }

  .pagination-controls {
    text-align: center;
    margin-top: 20px;
  }

  .pagination-controls button {
    margin: 0 5px;
  }

  .pagination-controls select {
    margin-left: 10px;
  }
</style>
