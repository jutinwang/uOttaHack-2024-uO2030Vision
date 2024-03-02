<template>
  <nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  nav {
  background-color: #333; /* Set background color */
  color: #fff; /* Set text color */
  padding: 10px 20px; /* Add padding */
}

ul {
  list-style-type: none; /* Remove list bullets */
  margin: 0;
  padding: 0;
}

li {
  display: inline; /* Display list items horizontally */
  margin-right: 20px; /* Add spacing between items */
}

a {
  color: #fff; /* Set link color */
  text-decoration: none; /* Remove underline */
}

a:hover {
  text-decoration: underline; /* Add underline on hover */
}
}
</style>
