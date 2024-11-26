<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import ProvinceList from "./ProvinceList.svelte";
  import CreateProvince from "./CreateProvince.svelte";

  let provincias = [];
  let errorMessage = "";
  let page = 1; // Current page
  let limit = 10; // Items per page
  let totalCount = 0; // Total number of provinces

  // Function to fetch provinces with pagination
  const fetchProvincias = async () => {
    try {
      const response = await axios.get("https://api.bisno.pro/api/provincias", {
        params: { page, limit },
      });
      provincias = response.data.items;
      totalCount = response.data.total_count; // Assume total_count is part of the response
    } catch (error) {
      errorMessage = "Error fetching provinces";
    }
  };

  // Handle page change (pagination)
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / limit)) {
      page = newPage;
      fetchProvincias(); // Fetch provinces for the new page
    }
  };

  // Handle limit change
  const changeLimit = (newLimit) => {
    limit = newLimit;
    page = 1; // Reset to the first page when limit is changed
    fetchProvincias(); // Fetch provinces with the new limit
  };

  // On initial load, fetch provinces
  onMount(fetchProvincias);
</script>

<div>
  <h1>Provinces</h1>

  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}

  <CreateProvince on:fetchProvincias={fetchProvincias} />

  <!-- Pass pagination data to ProvinceList -->
  <ProvinceList
    {provincias}
    {fetchProvincias}
    {page}
    {limit}
    {totalCount}
    on:changePage={(event) => changePage(event.detail)}
    on:changeLimit={(event) => changeLimit(event.detail)}
  />
</div>
