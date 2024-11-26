<script>
  import { onMount } from "svelte";
  import CreateMunicipio from "./CreateMunicipio.svelte";
  import MunicipioList from "./MunicipioList.svelte";
  import { fetchAllMunicipios } from "../../api";

  let municipios = [];
  let errorMessage = "";
  let page = 1;
  let limit = 10;
  let totalCount = 0;

  // Fetch all municipios (paginated)
  const fetchMunicipalities = async () => {
    try {
      const response = await fetchAllMunicipios(page, limit);
      municipios = response.data.items;
      totalCount = response.data.total_count;
    } catch (error) {
      errorMessage = "Error fetching municipios";
    }
  };

  // Handle page change (pagination)
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / limit)) {
      page = newPage;
      fetchProvinces(); // Fetch provinces for the new page
    }
  };

  // Handle limit change
  const changeLimit = (newLimit) => {
    limit = newLimit;
    page = 1; // Reset to the first page when limit is changed
    fetchProvinces(); // Fetch provinces with the new limit
  };

  // On initial load, fetch provinces
  onMount(fetchMunicipalities);
</script>

<div>
  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}

  <CreateMunicipio on:fetchAllMunicipios={fetchMunicipalities} />

  <!-- Pass pagination data to ProvinceList -->
  <MunicipioList
    {municipios}
    {fetchMunicipalities}
    {page}
    {limit}
    {totalCount}
    on:changePage={(event) => changePage(event.detail)}
    on:changeLimit={(event) => changeLimit(event.detail)}
  />
</div>
