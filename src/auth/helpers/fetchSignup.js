

export const fetchSignup = async(formState = {}) => {
    try{
     const url = 'https://backend-recipes-bootcamps-tribe.onrender.com/api/auth/signup';
     const resp = await fetch(url, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(formState)
     });

      if(resp.ok){
        const postResp = await resp.json();
        return postResp;
      }
    } catch(error){
      console.log(error)
    }
   }