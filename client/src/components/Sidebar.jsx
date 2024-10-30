import SearchInput from './SearchInput';
import LogoutButton from './LogoutButton';
import Conversations from './Conversations';
const  Sidebar = () => {
  return (
    <div className="flex-1 flex flex-col" style={{flex:1}}>
      <SearchInput/>
      <div className='divider px-3'></div>
      <Conversations/>
      <LogoutButton/>
    </div>
  )
}

export default Sidebar