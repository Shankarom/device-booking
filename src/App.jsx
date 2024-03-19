import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; // Import the AuthProvider
import OnBoarding from './pages/login/login';
import AddDevice from './component/modules/Device/AddDevice';
import Navbar from './component/modules/sidebar/superadminSidebar';
import DeviceScreen from './pages/device/DevicePage';
import ManagersScreen from '../src/pages/managers/managers';
import UsersScreen from '../src/pages/users/user';
import  CompanyScreen  from "./pages/company/company"
import { Toaster } from 'react-hot-toast';
import { DeviceProvider } from './context/deviceContext';
import { ManagerProvider } from './context/managerContext';
import { UserProvider } from './context/userContext';
import { DashboardProvider } from './context/dashBoardContext';
import {CompanyProvider} from './context/companyContext'
import LicenseScreen from '../src/pages/license/LicensePage';
import { LicenseProvider } from './context/licenseContext'
import AddLicense from './component/modules/license/AddLicense';
import DashboardScreen from './pages/dashboard/superadminDashboard'
import { ToggleContextProvider } from './context/ToogleContext';
import BookingScreen from './pages/bookings/bookingPage';
import { BookingProvider } from './context/bookingContext';


function App() {
  return (
    <div className='bg-[#e1edff] h-screen'>
      {/* <BrowserRouter> */}
        <AuthProvider>
          <ToggleContextProvider>
          <DeviceProvider>
          <ManagerProvider>
         <CompanyProvider>
         <LicenseProvider>
          <DashboardProvider>
            <BookingProvider>
              <CompanyProvider>
                  <DashboardProvider>
                    <UserProvider>
          <Routes>
            <Route path='*' element={<OnBoarding />} />
            <Route path='/addDevice' element={<AddDevice />} />
            <Route path='/addLicense' element={<AddLicense />} />
            <Route path='/navbar' element={<Navbar />} />
            <Route path='/device' element={<DeviceScreen />} />
            <Route path='/manager' element={<ManagersScreen />} />
            <Route path='/company' element={<CompanyScreen/>} />
            <Route path='/license' element={<LicenseScreen />} />
            <Route path='/dashboard' element={<DashboardScreen/>} />
            <Route path='/booking' element = {<BookingScreen/>}/>
            <Route path="/device/:deviceId" element={<DeviceScreen />}/>
            <Route path='/user' element={<UsersScreen/>} />
            <Route path="/user/:companyId" element={<UsersScreen />}/>

          </Routes>
          </UserProvider>
          </DashboardProvider>
          </CompanyProvider>
          </BookingProvider>
          </DashboardProvider>
          </LicenseProvider>
          </CompanyProvider>
          </ManagerProvider>
          </DeviceProvider>
          </ToggleContextProvider>
        </AuthProvider>
      {/* </BrowserRouter> */}
      <Toaster position='top-center'/>
    </div>
  );
}

export default App;
