import React from 'react';
import axios from 'axios';

const Main = (props) => {
  console.log({ props });
  return <b>Hello!</b>;
};

const getServerSideProps = async ({ req }) => {
  const { data } = await axios.get(
    `${process.env.INGRESS_CONTROLLER_URL}/api/users/current`,
    { headers: req.headers }
  );
  return { props: data };
};

export default Main;
export { getServerSideProps };
