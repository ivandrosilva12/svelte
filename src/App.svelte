<script>
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import About from "./components/About.svelte";
  import Contact from "./components/Contact.svelte";
  import RealState from "./components/RealState.svelte";
  import Provincia from "./components/provincias/Provincia.svelte";
</script>

<Router>
  <div class="navbar">
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/realstate">Real State</Link></li>
        <li><Link to="/provincias">Provincias</Link></li>
      </ul>
    </nav>
  </div>

  <div class="content">
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/realstate" component={RealState} />
    <Route path="/provincias" component={Provincia} />
  </div>
</Router>

<style>
  .navbar {
    background-color: #333;
    padding: 10px;
  }

  .navbar nav ul {
    display: flex;
    list-style-type: none;
    padding: 0;
  }

  .navbar nav ul li {
    margin-right: 20px;
  }

  .navbar nav ul li {
    color: white;
    text-decoration: none;
    padding: 8px 16px;
  }

  .navbar nav ul li:hover {
    background-color: #555;
    border-radius: 4px;
  }

  .content {
    padding: 20px;
  }
</style>
