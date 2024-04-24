import React from 'react'
import { useAuthStore } from '../../store.tsx';
import AuthLayout from '../../layout/AuthLayout';

export default function PageNotFound() {
    const {isLoggedIn} = useAuthStore();
  return (
        <AuthLayout>
            <div className='d-flex justify-content-center align-items-center'>
                <h1>404 Page Not Found</h1>
            </div>
        </AuthLayout>
  )
}
