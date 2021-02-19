import PropTypes from 'prop-types';
import React from 'react';

const MyError = ({ statusCode }) => (
  <div>
    <h1>
      {statusCode}
      {' '}
      에러 발생
    </h1>
  </div>
);

MyError.propTypes = {
  statusCode: PropTypes.number,
};

MyError.defaultProps = {
  statusCode: 400,
};

MyError.getInitialProps = async (context) => {
  const newLocal = context.err ? context.err.statusCode : null;
  const statusCode = context.res
    ? context.res.statusCode : newLocal;
  return { statusCode };
};

export default MyError;
