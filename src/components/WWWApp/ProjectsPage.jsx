import React, { Suspense } from 'react';
import { Typography, Card } from 'antd';
import { Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import BlankApp from './BlankApp';
import FinePrintApp from './FinePrintApp';
import TextUtilApp from './TextUtilApp';
import { useLocation } from 'react-router-dom';
import { CheckCircleFilled, ToolFilled, WarningFilled } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';

const ProjectsPage = () => {
  const inlineProjects = [
    {name: "TextUtil", status: 'active', description: "An app that helps you manipulate text.", route: "/projects/text_util", element: <TextUtilApp/>},
    {name: 'Fitness Tracker', status: 'unstarted', description: 'A fitness tracker app that helps you keep track of your daily exercise routine.', route: '/projects/fitness_tracker', element: <BlankApp/>},
    {name: 'Piano App', status: 'unstarted', description: 'A piano app that helps you learn how to play the piano.', route: '/projects/piano_app', element: <BlankApp/>},
    {name: 'Recipe Book', status: 'unstarted', description: 'A recipe book app that helps you keep track of your favorite recipes.', route: '/projects/recipe_book', element: <BlankApp/>},
    {name: 'Fine Print', status: 'unstarted', description: 'An app that helps you read the fine print on contracts.', route: '/projects/fine_print', element: <FinePrintApp/>},
  ]

  const externalProjects = [
    {name: 'Budget Tracker', status: 'in_progress', description: 'Set up your weekly safe-to-spend and track transactions.', route: '/budget_tracker'},
    {name: 'Second Hand Fix', status: 'active', description: 'An app that styles you for less.', route: '/2ndhandfix'},
  ]
  const location = useLocation();
  const [selectedProject, setSelectedProject] = React.useState(null);
  const theme = useTheme();

  React.useEffect(() => {
    const project = [inlineProjects, externalProjects].flat().find(project => location.pathname.startsWith(project.route));
    setSelectedProject(project);
  }, [location.pathname]);

  return (
    <div>
      <Typography.Title level={2}>Our Projects</Typography.Title>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {externalProjects.map(project => (
          <Link key={project.route} to={project.route}>
            <Card title={
              <>
                <span style={{ marginRight: 5 }}>
                  { project.status === 'unstarted' && <WarningFilled style={{ color: theme.colorWarning }}/>}
                  { project.status === 'in_progress' && <ToolFilled style={{ color: theme.colorInfo }}/>}
                  { project.status === 'active' && <CheckCircleFilled style={{ color: theme.colorSuccess }}/>}
                </span>
                {project.name}
              </>
            } style={{ width: 200, margin: 10, boxShadow: selectedProject?.route === project.route ? '0 0 10px gray' : 'none' }}>
              <p>{project.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      <hr />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {inlineProjects.map(project => (
          <Link key={project.route} to={project.route}>
            <Card title={
              <>
                <span style={{ marginRight: 5 }}>
                  { project.status === 'unstarted' && <WarningFilled style={{ color: theme.colorWarning }}/>}
                  { project.status === 'in_progress' && <ToolFilled style={{ color: theme.colorInfo }}/>}
                  { project.status === 'active' && <CheckCircleFilled style={{ color: theme.colorSuccess }}/>}
                </span>
                {project.name}
              </>
            } style={{ width: 200, margin: 10, boxShadow: selectedProject?.route === project.route ? '0 0 10px gray' : 'none' }}>
              <p>{project.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {selectedProject && selectedProject.element}
      </div>
    </div>
  )
}

export default ProjectsPage;
