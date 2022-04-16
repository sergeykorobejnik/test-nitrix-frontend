import {Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import AuthPage from "./pages/AuthPage";
import PrivatePages from "./components/hoc/PrivatePages";
import IndexPage from "./pages/IndexPage";
import {useDispatch, useSelector} from "react-redux";
import {authCheck} from "./redux/actions/actions";
import {useEffect} from "react";
import Tasks from "./pages/Tasks";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authCheck())
        }, [])

    return (
        <div className="App">
            <ErrorMessage/>
              <Routes>
                <Route path='/test-nitrix-frontend' element={<Layout/>}>
                    <Route index element={<IndexPage/>}/>
                    <Route path='auth/:type' element={<AuthPage/>}/>
                    <Route path='tasks' element={
                        <PrivatePages>
                            <Tasks/>
                        </PrivatePages>
                    }/>
                </Route>
              </Routes>
        </div>
      );
}

export default App;
