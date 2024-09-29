import React from 'react';
import Icon from '@ant-design/icons';

const CirclesIcon = (props) => {
  const CirclesSvg = () => {
    const circleBorderWidth = 52;

    return (
      <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <title>circles icon</title>
        {/* 2 concentric circles not filled, black border */}
        <circle cx="512" cy="512" r="512" fill="currentColor" />
        <circle cx="512" cy="512" r={512 - circleBorderWidth} fill="white" />
        <circle cx="512" cy="512" r="256" fill="currentColor" />
        <circle cx="512" cy="512" r={256 - circleBorderWidth} fill="white" />
        <circle cx="512" cy="512" r="128" fill="currentColor" />
      </svg>
    );
  };

  return <Icon component={CirclesSvg} {...props} />;
}

export default CirclesIcon;
