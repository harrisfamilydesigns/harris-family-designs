import React from 'react';
import { Typography, Card } from 'antd';

const ProjectsPage = () => {
  const projects = [
    {id: 1, name: 'Fitness Tracker', description: 'A fitness tracker app that helps you keep track of your daily exercise routine.'},
    {id: 2, name: 'Piano App', description: 'A piano app that helps you learn how to play the piano.'},
    {id: 3, name: 'Recipe Book', description: 'A recipe book app that helps you keep track of your favorite recipes.'},
    {id: 4, name: 'Fine Print', description: 'An app that helps you read the fine print on contracts.'},
  ]

  // Show antd cards for each project
  return (
    <div>
      <Typography.Title level={2}>Our Projects</Typography.Title>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map(project => (
          <Card key={project.id} title={project.name} style={{ width: 300, margin: 10 }}>
            <p>{project.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage;
