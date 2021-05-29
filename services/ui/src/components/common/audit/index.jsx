import React, { useEffect } from 'react';
/**
 * Higher order component to log user events
 */
const COMPONENT_TYPE = {
  CLICK: 'click',
  NAVIAGTION: 'navigation',
};

const WithAudit = (props) => {
  const { dataid, dataaudit, children, type } = props;
  useEffect(() => {
    if (type === COMPONENT_TYPE.CLICK && dataid && dataaudit) {
      // console.log(
      //   'Call your service to log user click. Use attributes like - dataid, dataaudit for additional details',
      // );
    }
  }, [dataid, dataaudit, type]);

  return <>{children}</>;
};

export default WithAudit;
