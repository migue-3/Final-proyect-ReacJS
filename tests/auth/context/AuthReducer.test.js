import { AuthReducer } from "../../../src/auth/context/AuthReducer";
import { types } from "../../../src/auth/types/types";


describe('Pruebas en authReducer', () => { 

    test('debe de retornar el estado por defecto', () => { 

        const state = AuthReducer({user: null}, {});
        expect( state ).toEqual({user: null});
     });

     test('debe de llamar (login) el login autenticar y establecer el usuario', () => { 

        const action = {
            type: types.login,
            payload: {
                email: 'migue@mail.com',
                password: '123456'
            }
        }

        const state = AuthReducer({user: null},action);
        expect(state).toEqual({
            user: action.payload
        })
      });

      test('debe de (logout) borrar el name del usuario y logged en false', () => { 

        const state = {
            user: {email: 'migue@mail.com', password: '123456'}
        }

        const action = {
            type: types.logout
        }

        const newState = AuthReducer(state, action);

        expect(newState).toEqual({user: null});
     });
 })