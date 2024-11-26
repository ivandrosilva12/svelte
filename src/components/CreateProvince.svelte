<script>
  import { createProvincia } from "../api";

  import { createEventDispatcher } from "svelte";
  import Swal from "sweetalert2"; // Import SweetAlert2

  const dispatch = createEventDispatcher();

  let nome = "";

  const createProvince = async () => {
    try {
      const provinceData = { nome };
      await createProvincia(provinceData);
      dispatch("fetchProvincias");
      nome = "";
    } catch (error) {
      alert("Error creating province");
    }
    Swal.fire({
      title: "Created!",
      text: "The province has been created.",
      icon: "success",
      timer: 1000, // Dialog will automatically close after 1 second
      showConfirmButton: false, // Hide the confirm button
    });
  };
</script>

<div>
  <h2>Create Province</h2>
  <input type="text" bind:value={nome} placeholder="Province Name" />
  <button on:click={createProvince}>Create</button>
</div>
