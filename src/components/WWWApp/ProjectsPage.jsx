import React, { Suspense } from 'react';
import { Typography, Card, Tag } from 'antd';
import { Routes, Route, Navigate, Link, Outlet, useNavigate } from 'react-router-dom';
import BlankApp from './BlankApp';
import FinePrintApp from './FinePrintApp';
import TextUtilApp from './TextUtilApp';
import { useLocation } from 'react-router-dom';
import { CheckCircleFilled, ToolFilled, WarningFilled } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';
import { BudgetTracker } from '../BudgetTracker/BudgetTracker';

const projects = [
  {name: "TextUtil", status: 'active', description: "An app that helps you manipulate text.", route: "/text_util", element: <TextUtilApp/>},
  {name: 'Budget Tracker', status: 'in_progress', description: 'Set up your weekly safe-to-spend and track transactions.', route: '/budget_tracker', element: <BudgetTracker/>},
  {name: 'Fitness Tracker', status: 'unstarted', description: 'A fitness tracker app that helps you keep track of your daily exercise routine.', route: '/fitness_tracker', element: <BlankApp/>},
  {name: 'Piano App', status: 'unstarted', description: 'A piano app that helps you learn how to play the piano.', route: '/piano_app', element: <BlankApp/>},
  {name: 'Recipe Book', status: 'unstarted', description: 'A recipe book app that helps you keep track of your favorite recipes.', route: '/recipe_book', element: <BlankApp/>},
  {name: 'Fine Print', status: 'unstarted', description: 'An app that helps you read the fine print on contracts.', route: '/fine_print', element: <FinePrintApp/>},
]

const Layout = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = React.useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    const project = projects.find(project => location.pathname.startsWith('/projects' + project.route));
    if (!project) {
      navigate('/projects' + projects[0].route);
    } else {
      setSelectedProject(project);
    }
  }, [location.pathname]);

  return (
    <div>
      <Typography.Title level={2}>Our Projects</Typography.Title>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map(project => (
          <Link key={project.route} to={'/projects' + project.route}>
            <Card title={
              <>
                <span style={{ marginRight: 5 }}>
                  { project.status === 'unstarted' && <WarningFilled style={{ color: theme.colorWarning }}/>}
                  { project.status === 'in_progress' && <ToolFilled style={{ color: theme.colorInfo }}/>}
                  { project.status === 'active' && <CheckCircleFilled style={{ color: theme.colorSuccess }}/>}
                </span>
                {project.name}
              </>
            } style={{ width: 300, margin: 10, boxShadow: selectedProject === project ? '0 0 10px #1890ff' : 'none' }}>
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
}

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
