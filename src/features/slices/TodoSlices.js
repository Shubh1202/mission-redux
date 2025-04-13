import { createSlice, nanoid } from "@reduxjs/toolkit";

const isExistLocalStorage = JSON.parse(localStorage.getItem('tods'))
const initialState = {
    todosArray: (isExistLocalStorage && isExistLocalStorage.length > 0) ? isExistLocalStorage : [
        {
            id: 54987464,
            data: "Hello User",
            isCompleted: false
        }
    ]
}

const storeLocalStorage = (array) => {
    localStorage.setItem('tods', JSON.stringify(array))
}

const TodoSlice = createSlice({
    name: 'my-todos',
    initialState,
    reducers: {
        addTodoItem: (state, action) => {
            const obj = {
                id: nanoid(),
                data: action.payload.data,
                isCompleted: false
            }
            state.todosArray.push(obj)
            storeLocalStorage(state.todosArray)
        },
        deleteTodoItem: (state, action) => {
            state.todosArray = state.todosArray.filter((obj) => obj.id !== action.payload)
        },
        updateTodoItem: (state, action) => {
            // state.todosArray = state.todosArray.filter((obj) => obj.id === action.payload?.id).map((obj, index) => ({
            //     data: action.payload?.data
            // }))
            const payloadObj = action.payload

            if(payloadObj?.data){
                state.todosArray = state.todosArray.map((obj, index) => (obj?.id === payloadObj?.id) ? {...obj, data: payloadObj?.data} : obj)
            }

            if(payloadObj?.isCompleted === 'update'){
                state.todosArray = state.todosArray.map((obj, index) => (obj?.id === payloadObj?.id) ? {...obj, isCompleted: !obj?.isCompleted} : obj)
            }

            storeLocalStorage(state.todosArray)

        }
    }
})

export const {addTodoItem, deleteTodoItem, updateTodoItem} = TodoSlice.actions

export default TodoSlice.reducer