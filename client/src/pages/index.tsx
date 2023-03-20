import { Routes, Route } from "react-router-dom";
import { Main } from "./main";
import { NotFound } from "./notFound";

export default function PagesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
