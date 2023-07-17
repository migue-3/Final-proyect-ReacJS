import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { HomePage } from "../recipes/pages/HomePage"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import { EditPage } from "../recipes/pages/EditPage"
import { DetailsPage } from "../recipes/pages/DetailsPage"

export const AppRouter = () => {

  return (
    <Routes>

      {/* { login y registro } */}
      <Route path="/auth/*" element={
          <PublicRoute>
            <AuthRoutes />
          </PublicRoute>
      } />


      <Route path="/" element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      } />
      <Route path="/edit/:id" element={
        <PrivateRoute>
          <EditPage />
        </PrivateRoute>
      } />
      <Route path="/details/:id" element={
        <PrivateRoute>
          <DetailsPage />
        </PrivateRoute>
      } />

    </Routes>
  )
}


