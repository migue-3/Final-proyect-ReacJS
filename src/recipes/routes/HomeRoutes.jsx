import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { EditPage } from "../pages/EditPage";
import { DetailsPage } from "../pages/DetailsPage";

export const HomeRoutes = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/details/:id" element={<DetailsPage/>} />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
