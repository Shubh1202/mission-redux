import { useSelector, useDispatch } from "react-redux"
import { deleteTodoItem, updateTodoItem } from '../features/slices/TodoSlices'
import { useState } from "react";

const TodoList = () => {
    const [isEdit, setIsEdit] = useState('')
    const [input, setInput] = useState('')

    const dispatch = useDispatch();
    let itemList = useSelector((state) => state.todosArray)

    const removeItem = (id) => {
        dispatch(deleteTodoItem(id))
    }

    const editItem = (id=null, isChanged=false) => {
        if(id !== null && isChanged===false){
            setIsEdit(id)
            const prx = itemList.find((obj, index) => obj?.id === id)
            setInput(prx?.data)
            return 
        }

        if(isChanged){
            setIsEdit('')
            const obj = {
                id: id,
                data: input
            }
            dispatch(updateTodoItem(obj))
            setInput('')
        }
    }

    const handelIsCompleted = (id) => {
        const obj = {
            id: id,
            isCompleted: 'update'
        }
        dispatch(updateTodoItem(obj))

    }
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {
                itemList.map((obj, index) => (
                    <div className="mt-2 flex items-center gap-3 relative" key={index}>
                        <input type="checkbox" checked={obj?.isCompleted} onChange={(e) => handelIsCompleted(obj?.id)} className="h-5 w-5 text-indigo-600 border-gray-300 rounded hover:cursor-pointer"/>

                        <input value={(isEdit === obj.id) ? input : obj?.data} onChange={(e) => setInput(e.target.value)} type="text" name="text" id="text" autoComplete="off" disabled={(isEdit !== obj.id) ? true : false} required className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6  ${(isEdit !== obj?.id) ? 'disabled:bg-gray-200' : ''} ${(obj?.isCompleted) ? 'text-red-600 line-through': ''}`} />

                        <div className="absolute top-2 right-3 flex mx-auto gap-4">

                            {isEdit !== obj.id && 
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="w-4 h-4 text-blue-500 fill-current hover:cursor-pointer"
                                    onClick={(e) => editItem(obj?.id)}
                                    >
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                </svg>
                            }

                            {isEdit === obj.id &&
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 448 512"
                                    className="w-4 h-4 text-green-500 fill-current hover:cursor-pointer"
                                    onClick={(e) => editItem(obj?.id, true)}
                                >
                                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                                </svg>
                            }

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="w-4 h-4 text-red-500 fill-current hover:cursor-pointer"
                                onClick={(e) => removeItem(obj?.id)}
                            >
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default TodoList