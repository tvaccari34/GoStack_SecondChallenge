import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
      api.get('/repositories').then(response => {
          console.log(response);
          setProjects(response.data);
      })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "http://test.test",
      title: `Challenge React Front-End ${Date.now()}`,
      techs: [ "NodeJS", "ReactJS", "Express" ]
    });

    const project = response.data;

    setProjects([...projects, project ]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const response = await api.delete(`repositories/${id}`);

    if(response.status == 204)
    {
      setProjects(projects.filter(p => p.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {projects.map(project => <li key={project.id}>{project.title}
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
