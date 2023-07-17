import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { FoodRecipesApp } from './FoodRecipesApp';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FoodRecipesApp />
    </BrowserRouter>
  </React.StrictMode>,
)
