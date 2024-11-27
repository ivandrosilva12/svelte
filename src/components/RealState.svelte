<script>
    // Sample real estate property data
    const properties = [
      {
        id: 1,
        name: "Modern 3 Bedroom House",
        price: "$350,000",
        description: "A beautiful 3-bedroom house with a large garden, ideal for families.",
        location: "Miami, FL",
        type: "House",
        imageUrl: "https://via.placeholder.com/300x200?text=House+1",
      },
      {
        id: 2,
        name: "Luxury Apartment",
        price: "$1,200,000",
        description: "A luxurious apartment with ocean views and high-end finishes.",
        location: "Miami Beach, FL",
        type: "Apartment",
        imageUrl: "https://via.placeholder.com/300x200?text=Apartment+1",
      },
      {
        id: 3,
        name: "Cozy Studio",
        price: "$150,000",
        description: "A cozy studio perfect for singles or as a vacation home.",
        location: "Orlando, FL",
        type: "Studio",
        imageUrl: "https://via.placeholder.com/300x200?text=Studio+1",
      },
      {
        id: 4,
        name: "Spacious Commercial Space",
        price: "$500,000",
        description: "A large commercial property located in a prime business district.",
        location: "Downtown, Miami, FL",
        type: "Commercial",
        imageUrl: "https://via.placeholder.com/300x200?text=Commercial+1",
      },
      {
        id: 5,
        name: "Modern 3 Bedroom House",
        price: "$350,000",
        description: "A beautiful 3-bedroom house with a large garden, ideal for families.",
        location: "Miami, FL",
        type: "House",
        imageUrl: "https://via.placeholder.com/300x200?text=House+1",
      },
      {
        id: 6,
        name: "Luxury Apartment",
        price: "$1,200,000",
        description: "A luxurious apartment with ocean views and high-end finishes.",
        location: "Miami Beach, FL",
        type: "Apartment",
        imageUrl: "https://via.placeholder.com/300x200?text=Apartment+1",
      },
      {
        id: 7,
        name: "Cozy Studio",
        price: "$150,000",
        description: "A cozy studio perfect for singles or as a vacation home.",
        location: "Orlando, FL",
        type: "Studio",
        imageUrl: "https://via.placeholder.com/300x200?text=Studio+1",
      },
      {
        id: 8,
        name: "Spacious Commercial Space",
        price: "$500,000",
        description: "A large commercial property located in a prime business district.",
        location: "Downtown, Miami, FL",
        type: "Commercial",
        imageUrl: "https://via.placeholder.com/300x200?text=Commercial+1",
      },
    ];
  
    let selectedProperty = null; // Track selected property for detailed view
    let selectedType = "All"; // Track the selected property type for filtering
    let priceRange = { min: 0, max: 2000000 }; // Min and max price filter
  
    // Filter properties based on selected type and price range
    const filteredProperties = properties.filter((property) => {
      const price = parseInt(property.price.replace(/[^0-9]/g, ""), 10);
      return (
        (selectedType === "All" || property.type === selectedType) &&
        price >= priceRange.min && price <= priceRange.max
      );
    });
  
    const propertyTypes = ["All", "House", "Apartment", "Studio", "Commercial"];
  </script>
  
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
  
    header {
      background-color: #2c3e50;
      color: white;
      padding: 1rem;
      text-align: center;
    }
  
    .container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
  
    .property-card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 300px;
      cursor: pointer;
    }
  
    .property-card img {
      width: 100%;
      border-radius: 10px 10px 0 0;
    }
  
    .property-card .details {
      padding: 15px;
    }
  
    .property-card h2 {
      margin: 0;
      font-size: 1.5rem;
    }
  
    .property-card p {
      font-size: 1rem;
      color: #555;
    }
  
    .price {
      font-weight: bold;
      color: #27ae60;
    }
  
    .filters {
      padding: 10px;
      background-color: #ecf0f1;
      display: flex;
      justify-content: space-between;
    }
  
    .filters select,
    .filters input {
      padding: 5px;
      margin-right: 10px;
    }
  
    .back-button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
  
    .back-button:hover {
      background-color: #2980b9;
    }
  
    .property-detail {
      text-align: center;
    }
  </style>
  
  <header>
    <h1>Real Estate Listings</h1>
  </header>
  
  <!-- Filters Section -->
  <div class="filters">
    <select bind:value={selectedType}>
      {#each propertyTypes as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
  
    <input
      type="number"
      placeholder="Min Price"
      bind:value={priceRange.min}
      min="0"
    />
    <input
      type="number"
      placeholder="Max Price"
      bind:value={priceRange.max}
      min="0"
    />
  </div>
  
  <!-- Main Content -->
  {#if selectedProperty}
    <div class="property-detail">
      <h2>{selectedProperty.name}</h2>
      <img src={selectedProperty.imageUrl} alt={selectedProperty.name} />
      <p class="price">{selectedProperty.price}</p>
      <p class="location">Location: {selectedProperty.location}</p>
      <p>{selectedProperty.description}</p>
      <button class="back-button" on:click={() => selectedProperty = null}>Back to Listings</button>
    </div>
  {:else}
    <div class="container">
      {#each filteredProperties as property}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="property-card" on:click={() => selectedProperty = property}>
          <img src={property.imageUrl} alt={property.name} />
          <div class="details">
            <h2>{property.name}</h2>
            <p class="price">{property.price}</p>
            <p>{property.description}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  