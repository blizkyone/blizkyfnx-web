import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import SetLocationScreen from './screens/SetLocationScreen'
import UserLoginScreen from './screens/UserLoginScreen'
import UserRegisterScreen from './screens/UserRegisterScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import MyProfileScreen from './screens/MyProfileScreen'
import ServiceCreateScreen from './screens/ServiceCreateScreen'
import NotificationsScreen from './screens/NotificationsScreen'

function App() {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Route
                  path='/notifications'
                  component={NotificationsScreen}
                  exact
               />
               <Route path='/mi-perfil' component={MyProfileScreen} exact />
               <Route path='/login' component={UserLoginScreen} exact />
               <Route path='/register' component={UserRegisterScreen} exact />
               <Route
                  path='/crear-negocio'
                  component={ServiceCreateScreen}
                  exact
               />
               <Route
                  path='/set-location'
                  component={SetLocationScreen}
                  exact
               />
               <Route
                  path='/user/:id/profile'
                  component={UserProfileScreen}
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
