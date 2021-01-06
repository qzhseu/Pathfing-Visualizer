import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";


export const SidebarData = [
    {
        title: 'User List',
        path: '/admin',
        icon: <FaIcons.FaUserFriends/>,
        cName: 'nav-text'
    },
    {
        title: 'Game Rank',
        path: '/admin/gamerank',
        icon: <FaIcons.FaGamepad/>,
        cName: 'nav-text'
    },
    {
        title: 'Update Maze',
        path: '/admin/updatemaze',
        icon: <GiIcons.GiTreasureMap/>,
        cName: 'nav-text'
    },
  
    
]
