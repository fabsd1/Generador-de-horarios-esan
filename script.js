body {
  font-family: Arial, sans-serif;
  background-color: #f2f6fa;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #123889;
  margin-bottom: 20px;
}

#horario-container {
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  border: 1px solid #ccc;
  background-color: white;
  overflow-x: auto;
}

#horario-container div {
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 14px;
  min-height: 50px;
}

.header {
  background-color: #539acb;
  color: white;
  font-weight: bold;
}
