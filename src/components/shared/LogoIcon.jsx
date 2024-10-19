import Icon from '@ant-design/icons';
import logo from '/hfd.svg';

const LogoIcon = ({...props}) => {
  return (
    <Icon {...props} component={() => <img src={logo} alt="logo" style={{height: '64px'}}/>} />
  );
}

export default LogoIcon;
