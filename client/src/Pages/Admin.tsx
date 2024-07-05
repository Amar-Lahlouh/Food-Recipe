import React from 'react'
import AdminSidebar from '../Components/AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'

function Admin() {
    return (
        <div className="flex flex-col md:flex-row">
            <AdminSidebar />
            <div className="w-full md:ml-[150px] p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin
