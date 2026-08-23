import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetail from './pages/CourseDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCourses from './pages/admin/ManageCourses';
import CreateCourse from './pages/admin/CreateCourse';
import EditCourse from './pages/admin/EditCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/courses" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout>
                <ManageCourses />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/courses/create" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout>
                <CreateCourse />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/courses/edit/:id" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout>
                <EditCourse />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
