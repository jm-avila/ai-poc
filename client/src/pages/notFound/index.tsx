import { Link } from "react-router-dom";
import { AppPath } from "../index";

export function NotFound() {
  return <Link to={AppPath.home}>Back Home</Link>;
}
