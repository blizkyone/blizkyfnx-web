import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import SetLocationScreen from './screens/SetLocationScreen'

function App() {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Route
                  path='/set-location'
                  component={SetLocationScreen}
                  exact
               />
               <Route path='/' component={HomeScreen} exact />
            </Container>
         </main>
         <Footer />
      </Router>
   )
}

export default App
