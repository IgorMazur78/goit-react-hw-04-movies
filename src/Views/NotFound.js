import React from "react";
import { Link } from "react-router-dom";
import routers from "../routes"

function NotFound() {
  return (
    <div>
      <h2>ERROR 404 : Not Found</h2>
      <p>
        You're lost, go <Link to={routers.home}>To the home page</Link>
      </p>
    </div>
  );
}
export default NotFound;
