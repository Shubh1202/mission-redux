import "./App.css"
import { Provider } from 'react-redux'
import {store} from './app/store'

import Todo from "./components/Todo"


const App = () => {
    return (
        <Provider store={store}>
        <div className="flex items-center justify-center text-white relative bg-gray-800 min-h-screen">
            <div className="absolute  top-5 w-full">
                <h1 className="text-center text-yellow-300 text-xl">Todo List using redux, react-redux, redux-toolkit</h1>
                <h1 className="text-center mb-5 text-blue-300 text-lg">By Shubahm Prajapati @shubahmprajapati1202</h1>
                <Todo />
            </div>
        </div>
        </Provider>
    )
}

export default App