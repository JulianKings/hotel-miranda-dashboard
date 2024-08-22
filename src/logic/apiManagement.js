import { createAsyncThunk } from "@reduxjs/toolkit";

export default function manageApiCalls(type)
{
    const fetchItems = createAsyncThunk(type + '/fetchItem', async () => {
        const response = await fetch( 
            'http://localhost:3000/' + type, 
            {                
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const fetchItemById = createAsyncThunk(type + '/fetchItemById', async (itemId) => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type + '/' + itemId, 
            {                
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    });

    const postItem = createAsyncThunk(type + '/postItem', async (itemObject) => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type, 
            {          
                method: 'POST',      
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(itemObject)
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const putItem = createAsyncThunk(type + '/putItem', async (itemObject) => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type + '/' + itemObject.id, 
            {          
                method: 'PUT',      
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(itemObject)
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const deleteItem = createAsyncThunk(type + '/deleteItem', async (itemObject) => {
        
        const response = await fetch( 
            'http://localhost:3000/' + type + '/' + itemObject.id, 
            {          
                method: 'DELETE',      
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(itemObject)
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Could not reach server: " + response.status);
            }

            return response.json();
        })
        .catch((error) => {
            throw new Error(error);
        });

        return response;
    })

    const populateBuilder = (builder) => {
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
            state.fetchError = action.error.message;            
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
            state.fetchError = action.error.message;            
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
            state.fetchError = action.error.message;            
        })
        .addCase(putItem.pending, (state) => {
            state.putStatus = 'pending';            
        })
        .addCase(putItem.fulfilled, (state, action) => {
            state.putStatus = 'fulfilled';
            const updatedObject = action.payload;
            if(updatedObject.id)
            {
                const updatedItems = [...state.items];
                const putIndex = updatedItems.findIndex((item) => item.id === updatedObject.id);
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
            state.fetchError = action.error.message;            
        })
        .addCase(deleteItem.pending, (state) => {
            state.deleteStatus = 'pending';            
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
            state.deleteStatus = 'fulfilled';
            const deletedObject = action.payload;
            if(deletedObject.id)
            {
                const updatedItems = [...state.items];
                const putIndex = updatedItems.findIndex((item) => item.id === deletedObject.id);
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
            state.fetchError = action.error.message;            
        })
    }

    return [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem];

}