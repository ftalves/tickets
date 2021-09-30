import { useEffect } from "react";
import Router from "next/router";

import { useRequest } from "hooks";

const Signout = () => {
  const { request } = useRequest();

  useEffect(() => {
    request({
      url: "/api/users/signout",
      method: "post",
    }).then(() => {
      Router.push("/");
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return <div>Signing out...</div>;
};

export default Signout;
