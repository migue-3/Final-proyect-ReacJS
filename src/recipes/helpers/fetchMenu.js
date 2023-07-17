
export const fetchMenu = async(idToken='') =>{

    const url= `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/get?auth=${ idToken }`;
    const resp = await fetch(url);
    const respGet = await resp.json();

        const recipes = respGet.map(recipe => ({
         _id: recipe._id,
         name: recipe.name,
         description: recipe.description,
         ingredients: recipe.ingredients,
         imagePath: recipe.imagePath,
         userEmail: recipe.userEmail,
         __v: recipe.__v

        }));
      return recipes;
}