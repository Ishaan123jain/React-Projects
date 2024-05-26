import { Provider } from "react-redux"
import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"
import { store } from "./App/Store"


function App() {


  return (
    <Provider store={store}>
     <div>React-reduxtoolkit</div>
     <AddTodo />
     <Todos />
    </Provider>
  )
}

export default App
