import { AuthProvider } from "./auth/context/AuthProvider"
import { MenuProvider } from "./recipes/context/MenuProvider"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"



export const FoodRecipesApp = () => {
  return (
    <>
    <AuthProvider>
    <MenuProvider>
    <AppTheme>
    <AppRouter/>
    </AppTheme>
    </MenuProvider>
    </AuthProvider>
    </>
  )
}
