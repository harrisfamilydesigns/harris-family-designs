import { theme as antTheme } from 'antd';

export const useTheme = () => {
  const { token: theme } = antTheme.useToken();
  return theme;
}
