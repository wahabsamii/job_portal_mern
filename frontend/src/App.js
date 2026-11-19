import React, { useEffect } from 'react';
import Home from './pages/Home';
import PostJob from './pages/PostJob'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import JobsDetails from './pages/JobsDetails';
import Contact from './pages/Contact';
import Application from './pages/Application';
import AllJobs from './pages/JobSeeker/AllJobs';
import MyApplications from './pages/JobSeeker/MyApplications';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminAllJobs from './pages/Admin/AllJobs';
import AddJob from './pages/Admin/AddJob';
import UpdateJob from './pages/Admin/UpdateJob';
import AllApplications from './pages/Admin/AllApplications';
import Dashboard from './pages/JobSeeker/Dashboard'
import About from './pages/About';
import Protected from './components/Protected';
import { useSelector } from 'react-redux';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Admin/Profile';
import { Toaster } from 'react-hot-toast';
import AOS from "aos";
import "aos/dist/aos.css";
import SeekerLayout from './pages/JobSeeker/SeekerLayout';
import AdminLayout from './pages/Admin/AdminLayout';

export default function App() {
  const isAuth = useSelector(state => state.user.isAuth);
   useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);
  return (
    <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/post-job' element={<PostJob /> } />
      <Route path='/job-details/:id' element={<JobsDetails /> } />
      <Route path='/contact' element={<Contact /> } />
      <Route path='/apply' element={<Protected isAuth={isAuth}><Application /></Protected> } />
      <Route path='/about-us' element={<About /> } />
      
      <Route path="/search" element={<SearchResults />} />
      {/* User Dashboard */}
      <Route path="/dashboard/seeker" element={<SeekerLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="my-applications" element={<MyApplications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={<Protected isAuth={isAuth}><AdminLayout /></Protected>}>
          <Route index  element={<AdminDashboard />} />
          <Route path="all-jobs" element={<AdminAllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="update-job/:id" element={<UpdateJob />} />
          <Route path="all-applications" element={<AllApplications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}
