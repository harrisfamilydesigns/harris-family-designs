import Icon from '@ant-design/icons';
import logo from 'assets/hfd.png';

const LogoIcon = ({...props}) => {
  return (
    <Icon {...props} component={() => <img src={logo.src} alt="logo" style={{height: '64px'}}/>} />
  );
}

export default LogoIcon;
