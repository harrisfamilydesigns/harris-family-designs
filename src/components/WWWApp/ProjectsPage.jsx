import React from 'react';
import { Typography, Menu, Layout } from 'antd';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import BlankApp from './BlankApp';
import FinePrintApp from './FinePrintApp';
import TextUtilApp from './TextUtilApp';
import { useLocation } from 'react-router-dom';
import Icon, { CameraOutlined, CheckCircleFilled, ExportOutlined, FontSizeOutlined, ToolFilled, WarningFilled } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';
import { BudgetTracker } from '../BudgetTracker/BudgetTracker';
import PhotoUtilApp from 'components/PhotoUtilApp/Root';

const projects = [
  {name: 'ImageUtil', status: 'active', icon: <CameraOutlined/>, description: 'An app that helps you manipulate photos.', path: 'photo_util'},
  {name: "TextUtil", status: 'active', icon: <FontSizeOutlined/>, description: "An app that helps you manipulate text.", path: "text_util"},

  {name: 'Fitness Tracker', status: 'unstarted', icon: <Icon component={() => '🏃‍♂️'} />, description: 'A fitness tracker app that helps you keep track of your daily exercise routine.', path: 'fitness_tracker'},
  {name: 'Piano App', status: 'unstarted', icon: <Icon component={() => '🎹'}/>, description: 'A piano app that helps you learn how to play the piano.', path: 'piano_app'},
  {name: 'Recipe Book', status: 'unstarted', icon: <Icon component={() => '🥩'} />, description: 'A recipe book app that helps you keep track of your favorite recipes.', path: 'recipe_book'},
  {name: 'Fine Print', status: 'unstarted', icon: <Icon component={() => '📑'}/>, description: 'An app that helps you read the fine print on contracts.', path: 'fine_print'},

  {name: 'Budget Tracker', status: 'inProgress', icon: <Icon component={() => '💳'}/>, description: 'Set up your weekly safe-to-spend and track transactions.', path: 'budget_tracker'},

  {name: 'SecondHand', status: 'active', icon: <Icon component={() => '👔'}/>, description: 'An app that helps you buy and sell second-hand items.', path: '/second_hand'},
  {name: 'GolfShot', status: 'inProgress', icon: <Icon component={() => '⛳️'}/>, description: 'Hit the perfect golf shot, every time.', path: '/golf_shot'}
]

const ProjectsPage = () =>
  // These apps are displayed inline on the projects page. Others are redirected to their own page.
  useRoutes([
    { path: '/', element: <Main />, children: [
      { path: 'text_util', element: <TextUtilApp /> },
      { path: 'photo_util/*', element: <PhotoUtilApp /> },
      { path: 'fitness_tracker', element: <BlankApp /> },
      { path: 'piano_app', element: <BlankApp /> },
      { path: 'recipe_book', element: <BlankApp /> },
      { path: 'fine_print', element: <FinePrintApp /> },
      { path: 'budget_tracker', element: <BudgetTracker /> },
    ]}
  ])

const ProjectExternalLinkIcon = ({ path }) => {
  if (path.startsWith('/')) {
    return <ExportOutlined />
  } else {
    return null;
  }
}

const ProjectStatusIcon = ({ status }) => {
  const theme = useTheme();
  switch (status) {
    case 'unstarted':
      return <WarningFilled style={{ color: theme.colorWarning }}/>
    case 'inProgress':
      return <ToolFilled style={{ color: theme.colorInfo }}/>
    case 'active':
      return <CheckCircleFilled style={{ color: theme.colorSuccess }}/>
    default:
      return null;
  }
}

const Main = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);
  const navigate = useNavigate();
  const { Content, Sider } = Layout;

  React.useEffect(() => {
    const project = projects.find(project => location.pathname.includes(project.path));
    if (!project) {
      navigate(projects[0].path, { replace: true });
    } else {
      setSelectedProject(project);
    }
  }, [location.pathname]);

  const handleProjectNavigation = ({ key: path }) => (
    path.startsWith('/') ?
    window.open(path, '_blank') :
    navigate(path)
  )

  return (
    <Layout>
      <Sider
        breakpoint='md'
      >
        <Menu
          mode="inline"
          className="h-full"
          selectedKeys={[selectedProject.path]}
          onClick={handleProjectNavigation}
          items={projects.map(project => ({
            key: project.path,
            label: (
              <div className="flex justify-between">
                <div>
                  {project.name}
                  <span className="ml-2">
                    <ProjectStatusIcon status={project.status} />
                  </span>
                </div>
                <ProjectExternalLinkIcon path={project.path} />
              </div>
            ),
            icon: project.icon }))}
        />
      </Sider>
      <Content className="md:container md:mx-auto">
        <div className="my-5 max-w-screen-md mx-auto px-5">
          <div className="text-center">
            <Typography.Title level={2}>
              <span className="mr-2">{selectedProject?.icon}</span>
              {selectedProject?.name}
            </Typography.Title>
          </div>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}

export default ProjectsPage;
