import React, {useEffect, useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositorios] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositorios(response.data);
    });
  },[]);
  async function handleAddRepository() {
      const response = await api.post('repositories',{
         title:'Back End H1 agencia',
         url: 'htpp://gith1agenica',
         techs: ['Higor Lopes']
      })

      setRepositorios([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`);

     setRepositorios(repositories.filter(
       repositorio => repositorio.id != id
     ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repositorio =>(
          <li key={repositorio.id}>
                {repositorio.title}

          <button onClick={() => handleRemoveRepository(repositorio.id)}>
            Remover
          </button>
        </li>
       ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
