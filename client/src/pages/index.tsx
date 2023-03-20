import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./home";
import { Embedding } from "./embedding";
import { Search } from "./search";
import { NotFound } from "./notFound";

export enum AppPath {
  home = "/home",
  search = "/search",
  embedding = "/embedding",
}

export default function PagesRoutes() {
  return (
    <Routes>
      <Route path={AppPath.home} element={<Home />} />
      <Route path={AppPath.search} element={<Search />} />
      <Route path={AppPath.embedding} element={<Embedding />} />
      <Route path="/" element={<Navigate to={AppPath.home} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
