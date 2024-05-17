import './App.css'
import { CakeView } from './features/cake/CakeView'
import { IcecreamView } from './features/icecream/IcecreamView'
import { UserView } from './features/user/UserView'
// we need to make redux store available to our react application
// react redux library -> exports a component called provided

function App() {

  return (
    <>
      <div className='app'>
        <CakeView />
        <IcecreamView />
        <UserView />
      </div>
    </>
  )
}

export default App
