import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodoItem } from "../features/slices/TodoSlices"

const TodoForm = () => {
    const [input, setInput] = useState('')
    const itemList = useSelector((state) => state?.todosArray)
    const inputBox = useRef(null)
    const dispatch = useDispatch()

    const addTodoData = (e) => {
        e.preventDefault()

        if(!input){
            return inputBox.current.focus()
        }

        const isExist = itemList.find((obj, index) => obj?.data?.toLocaleLowerCase() === input?.toLocaleLowerCase())
        if(isExist){
            return alert("This task is already exist.")
        }

        const obj = {
            data: input
        }

        dispatch(addTodoItem(obj))
        setInput('')
        
    }
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1>Create your task list</h1>
            <form onSubmit={addTodoData}>
                <div className="mt-2 relative" >
                    <input ref={inputBox} onChange={(e) => setInput(e.target.value)} value={input || ''} type="text" name="text" id="text" autoComplete="text" placeholder="Enter task..." className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                    <div className="absolute top-0 right-0">
                        <button type="submit" className="flex w-full justify-center rounded-sm bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TodoForm