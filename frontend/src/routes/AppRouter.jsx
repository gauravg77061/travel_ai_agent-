import { BrowserRouter,Routes,Route } from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
import ChatPage from "../pages/ChatPage";

const AppRoutes=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<AuthPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/chat/:groupId" element={<ChatPage/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes