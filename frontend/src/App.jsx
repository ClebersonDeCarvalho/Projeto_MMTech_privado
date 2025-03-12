import './App.css'
import NavBar from './components/navbar/NavBar'
import Home from './pages/home/Home'
import AdmRegister from './pages/admRegister/AdmRegister'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Manual from './pages/manual/Manual'
import CreateTeam from './pages/createTeam/CreateTeam'
import EditTeam from './pages/editTeam/EditTeam'
import AddMember from './pages/addMember/AddMember'
import MgrMember from './pages/mgrMember/MgrMember'
import MgrTeam from './pages/mgrTeam/MgrTeam'
import EditMember from './pages/editMember/EditMember'

function App() {
  return (
    <>
    <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cadastrar" element={<AdmRegister/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/manual" element={<Manual/>}/>
          <Route path="/criarTime" element={<CreateTeam/>}/>
          <Route path="/adicionarMembros" element={<AddMember/>}/>
          <Route path="/gerenciarTimes" element={<MgrTeam/>}/>
          <Route path="/editarTime/:id" element={<EditTeam/>} />
          <Route path="/gerenciarMembros" element={<MgrMember/>}/>
          <Route path="/editarMembro/:id" element={<EditMember/>}/>
        </Routes>
    </Router>   
    </>
  )
}

export default App;