import Footer from '../../components/footer/Footer'
import Header from "../../components/header/Header"
import { Outlet } from 'react-router-dom'
const Layouts = () => {
  return (
    <>
    <div className='bg-white rounded-lg'>
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </div>
  </>
  )
}

export default Layouts