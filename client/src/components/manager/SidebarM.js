import React from 'react'
import Logo from '../../assets/demo.jpg'
export const SidebarM = () => {
  return (
    <>
        <div className="bg-blue-200 min-h-screen">
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mt-4 mb-2">
                    {/* profile */}
                    <img src={Logo} alt="profile.jpg" className="w-20 h-20 rounded-circle"/>
                    <p className="m-0 text-lg">Unlimit unarn</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>
                </ul>
            </div>
        </div>
    </>
  )
}
