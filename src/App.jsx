import { Routes, Route } from 'react-router-dom'
import { Home } from './page/Home'
import { NotFound } from './page/NotFound'
import { Layout } from './components/Layout'
import { InfoPage } from './page/InfoPage'

function App() {

  return (
    <div className='bg-slate-900 min-h-screen text-white'>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/info/:type/:id' element={<InfoPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>

  )
}

export default App
