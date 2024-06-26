import React, { Suspense } from 'react';
import { Typography, Card } from 'antd';
import { Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import BlankApp from './BlankApp';
import FinePrintApp from './FinePrintApp';

const projects = [
  {name: 'Fitness Tracker', description: 'A fitness tracker app that helps you keep track of your daily exercise routine.', route: '/fitness_tracker', element: <BlankApp/>},
  {name: 'Piano App', description: 'A piano app that helps you learn how to play the piano.', route: '/piano_app', element: <BlankApp/>},
  {name: 'Recipe Book', description: 'A recipe book app that helps you keep track of your favorite recipes.', route: '/recipe_book', element: <BlankApp/>},
  {name: 'Fine Print', description: 'An app that helps you read the fine print on contracts.', route: '/fine_print', element: <FinePrintApp/>},
]

const Layout = () => (
  <div>
    <Typography.Title level={2}>Our Projects</Typography.Title>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {projects.map(project => (
        <Link key={project.route} to={'/projects' + project.route}>
          <Card title={project.name} style={{ width: 300, margin: 10 }}>
            <p>{project.description}</p>
          </Card>
        </Link>
      ))}
    </div>

    <div style={{ marginTop: 20 }}>
      <Outlet />
    </div>
  </div>
)

const ProjectsPage = () => {
  // Show antd cards for each project
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<BlankApp/>} />
          {projects.map(project => (
            <Route key={project.route} path={project.route} element={project.element} />
          ))}
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default ProjectsPage;
