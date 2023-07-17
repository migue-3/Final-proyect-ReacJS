import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations= {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
      createValidators();
    }, [formState])
    
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formValidation)) {
           if( formValidation[formValue] !== null ) return false; 
        }
        return true;
    }, [formValidation])

    const onInputChange = ({ target }) => {
        const { name, name2, name3, name4, value, value2, value3, value4 } = target;
        setFormState({
            ...formState,
            [ name ]: value,
            [ name2 ]: value2,
            [ name3 ]: value3,
            [ name4 ]: value4
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () =>{

        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )){
            const [fn, errorMessage = 'Campo requerido' ] = formValidations[ formField ];

            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}