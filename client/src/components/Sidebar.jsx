import SearchInput from './SearchInput';
import LogoutButton from './LogoutButton';
import Conversations from './Conversations';
import { useState } from 'react';
const Sidebar = () => {
  return (
    <div className="flex-1 flex flex-col" style={{ flex: 1 }}>
      <SearchInput />
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar