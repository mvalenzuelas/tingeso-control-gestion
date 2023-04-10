import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SidebarLink({ label, to }: { to: string, label: string }) {
  return (
    <li>
      <NavLink 
        className={({ isActive }) => `${isActive ? 'text-violet-700 underline' : ''} hover:underline`} 
        to={to}>
        { label }
      </NavLink>
    </li>
  )
}
