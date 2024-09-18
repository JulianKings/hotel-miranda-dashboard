import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiAbstractInterface, ApiBookingInterface, ApiContactInterface, ApiRoomInterface, ApiUserInterface } from "../interfaces/apiManagement";
import { RootState } from "../redux/store";
import { AbstractState } from "../interfaces/reduxManagement";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LocalStorageLoginInformation } from "../interfaces/sessionManagement";

export default function manageApiCalls(type: string): any
{
    let ssoToken: any = { jwt_token: undefined };
    if(localStorage.getItem('sso_token'))
    {
        const tok = localStorage.getItem('sso_token');
        if(tok)
        {
            ssoToken = JSON.parse(tok);
        }
    }
    const token = ssoToken.jwt_token;
    
    const fetchItems = createAsyncThunk(type + '/fetchItem', async (): Promise<ApiAbstractInterface[]> => {
        const response = await fetch( 
            'http://localhost:3000/' + type, 
            {                
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            mode: "cors"
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            switch(type)
            {
                case 'bookings':
                    return response.json() as Promise<ApiBookingInterface[]>;
                case 'contact':
                    return response.json() as Promise<ApiContactInterface[]>;
                case 'room':
                    return response.json() as Promise<ApiRoomInterface[]>;
                case 'user':
                    return response.json() as Promise<ApiUserInterface[]>;
                default:
                    return response.json();
            }
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const fetchItemById = createAsyncThunk(type + '/fetchItemById', async (item_id: number): Promise<ApiAbstractInterface> => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type + '/' + item_id, 
            {                
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            mode: "cors"
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            switch(type)
            {
                case 'bookings':
                    return response.json() as Promise<ApiBookingInterface>;
                case 'contact':
                    return response.json() as Promise<ApiContactInterface>;
                case 'room':
                    return response.json() as Promise<ApiRoomInterface>;
                case 'user':
                    return response.json() as Promise<ApiUserInterface>;
                default:
                    return response.json();
            }
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    });

    const postItem = createAsyncThunk(type + '/postItem', async (itemObject: ApiAbstractInterface): Promise<ApiAbstractInterface> => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type, 
            {          
                method: 'POST',      
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                mode: "cors",
                body: JSON.stringify(itemObject)
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            switch(type)
            {
                case 'bookings':
                    return response.json() as Promise<ApiBookingInterface>;
                case 'contact':
                    return response.json() as Promise<ApiContactInterface>;
                case 'room':
                    return response.json() as Promise<ApiRoomInterface>;
                case 'user':
                    return response.json() as Promise<ApiUserInterface>;
                default:
                    return response.json();
            }
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const putItem = createAsyncThunk(type + '/putItem', async (itemObject: ApiAbstractInterface): Promise<ApiAbstractInterface> => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type + '/' + itemObject._id, 
            {          
                method: 'PUT',      
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                mode: "cors",
                body: JSON.stringify(itemObject)
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            switch(type)
            {
                case 'bookings':
                    return response.json() as Promise<ApiBookingInterface>;
                case 'contact':
                    return response.json() as Promise<ApiContactInterface>;
                case 'room':
                    return response.json() as Promise<ApiRoomInterface>;
                case 'user':
                    return response.json() as Promise<ApiUserInterface>;
                default:
                    return response.json();
            }
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const deleteItem = createAsyncThunk(type + '/deleteItem', async (itemObject: ApiAbstractInterface): Promise<ApiAbstractInterface> => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type + '/' + itemObject._id, 
            {          
                method: 'DELETE',      
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                mode: "cors",
                body: JSON.stringify(itemObject)
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            switch(type)
            {
                case 'bookings':
                    return response.json() as Promise<ApiBookingInterface>;
                case 'contact':
                    return response.json() as Promise<ApiContactInterface>;
                case 'room':
                    return response.json() as Promise<ApiRoomInterface>;
                case 'user':
                    return response.json() as Promise<ApiUserInterface>;
                default:
                    return response.json();
            }
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const populateBuilder = (builder: ActionReducerMapBuilder<AbstractState>): void => {
        builder
        .addCase(fetchItems.pending, (state) => {
            state.fetchStatus = 'pending';            
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.items = action.payload;
            state.fetchError = null;
        })
        .addCase(fetchItems.rejected, (state, action) => {
            state.fetchStatus = 'rejected';
            state.fetchError = action.error;            
        })
        .addCase(fetchItemById.pending, (state) => {
            state.fetchStatus = 'pending';            
        })
        .addCase(fetchItemById.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.currentItem = action.payload;
            state.fetchError = null;
        })
        .addCase(fetchItemById.rejected, (state, action) => {
            state.fetchStatus = 'rejected';
            state.fetchError = action.error;            
        })
        .addCase(postItem.pending, (state) => {
            state.postStatus = 'pending';            
        })
        .addCase(postItem.fulfilled, (state, action) => {
            state.postStatus = 'fulfilled';
            const updatedItems = [...state.items];
            updatedItems.push(action.payload);
            state.items = updatedItems;
            state.fetchError = null;
        })
        .addCase(postItem.rejected, (state, action) => {
            state.postStatus = 'rejected';
            state.fetchError = action.error;            
        })
        .addCase(putItem.pending, (state) => {
            state.putStatus = 'pending';            
        })
        .addCase(putItem.fulfilled, (state, action) => {
            state.putStatus = 'fulfilled';
            const updatedObject = action.payload;
            if(updatedObject._id)
            {
                const updatedItems = [...state.items];
                const putIndex = updatedItems.findIndex((item) => item._id === updatedObject._id);
                if(putIndex !== -1)
                {
                    updatedItems.splice(putIndex, 1, updatedObject);
                    state.items = updatedItems;
                }
            }
            state.fetchError = null;
        })
        .addCase(putItem.rejected, (state, action) => {
            state.putStatus = 'rejected';
            state.fetchError = action.error;            
        })
        .addCase(deleteItem.pending, (state) => {
            state.deleteStatus = 'pending';            
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
            state.deleteStatus = 'fulfilled';
            const deletedObject = action.payload;
            if(deletedObject._id)
            {
                const updatedItems = [...state.items];
                const putIndex = updatedItems.findIndex((item) => item._id === deletedObject._id);
                if(putIndex !== -1)
                {
                    updatedItems.splice(putIndex, 1);
                    state.items = updatedItems;
                }
            }
            state.fetchError = null;
        })
        .addCase(deleteItem.rejected, (state, action) => {
            state.deleteStatus = 'rejected';
            state.fetchError = action.error;            
        })
    }

    return [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem];

}