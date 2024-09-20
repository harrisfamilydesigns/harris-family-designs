import React from 'react';
import { Typography, Card } from 'antd';
import { Link, Outlet, useNavigate, useRoutes } from 'react-router-dom';
import BlankApp from './BlankApp';
import FinePrintApp from './FinePrintApp';
import TextUtilApp from './TextUtilApp';
import { useLocation } from 'react-router-dom';
import { CheckCircleFilled, ToolFilled, WarningFilled } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';
import { BudgetTracker } from '../BudgetTracker/BudgetTracker';
import SecondHandApp from '../SecondHandApp/Root';

const projects = [
  {name: "TextUtil", status: 'active', description: "An app that helps you manipulate text.", path: "text_util", element: <TextUtilApp />},
  {name: 'SecondHand', status: 'active', description: 'An app that helps you buy and sell second-hand items.', path: '/second_hand', element: <SecondHandApp/>},
  {name: 'Budget Tracker', status: 'in_progress', description: 'Set up your weekly safe-to-spend and track transactions.', path: 'budget_tracker', element: <BudgetTracker/>},
  {name: 'Fitness Tracker', status: 'unstarted', description: 'A fitness tracker app that helps you keep track of your daily exercise routine.', path: 'fitness_tracker', element: <BlankApp/>},
  {name: 'Piano App', status: 'unstarted', description: 'A piano app that helps you learn how to play the piano.', path: 'piano_app', element: <BlankApp/>},
  {name: 'Recipe Book', status: 'unstarted', description: 'A recipe book app that helps you keep track of your favorite recipes.', path: 'recipe_book', element: <BlankApp/>},
  {name: 'Fine Print', status: 'unstarted', description: 'An app that helps you read the fine print on contracts.', path: 'fine_print', element: <FinePrintApp/>},
]

const ProjectsPage = () =>
  useRoutes([
    { path: '/', element: <Layout />, children: [
      { path: 'fine_print', element: <FinePrintApp /> },
      { path: 'text_util', element: <TextUtilApp /> },
      { path: 'budget_tracker', element: <BudgetTracker /> },
      { path: 'fitness_tracker', element: <BlankApp /> },
      { path: 'piano_app', element: <BlankApp /> },
      { path: 'recipe_book', element: <BlankApp /> },
    ]}
  ])

const Layout = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);
  const theme = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    const project = projects.find(project => location.pathname.includes(project.path));
    if (!project) {
      navigate(projects[0].path, { replace: true });
    } else {
      setSelectedProject(project);
    }
  }, [location.pathname]);

  return (
    <div className="mt-5">
      <Typography.Title level={2}>Our Projects</Typography.Title>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map(project => (
          <Link key={project.path} to={project.path}>
            <Card title={
              <>
                <span style={{ marginRight: 5 }}>
                  { project.status === 'unstarted' && <WarningFilled style={{ color: theme.colorWarning }}/>}
                  { project.status === 'in_progress' && <ToolFilled style={{ color: theme.colorInfo }}/>}
                  { project.status === 'active' && <CheckCircleFilled style={{ color: theme.colorSuccess }}/>}
                </span>
                {project.name}
              </>
            } style={{ width: 300, margin: 10, boxShadow: selectedProject.path === project.path ? '0 0 10px #1890ff' : 'none' }}>
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

export default ProjectsPage;
