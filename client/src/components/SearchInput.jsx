import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5'
import { useGetConversation } from '../hooks/useGetConversation';
import toast from 'react-hot-toast';
import useConversationStore from '../hooks/useConversationStore';

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversationStore()
  const { userChatList } = useGetConversation()

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search)
      return;
    if (search.length < 3)
      return toast.error("Please enter at least 3 search characters.");
    const result = userChatList.find(user => user.fullName.toLowerCase().includes(search.toLowerCase()))
    if (!result)
      toast.error("User not found");
    setSelectedConversation(result);
    setSearch("");
  }
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <form className="flex items-center gap-2" onSubmit={handleSearch}>
        <input type="text" className="grow input input-bordered rounded-full" placeholder="Search"
          value={search}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
      <div className={`dropdown ${isOpen && 'dropdown-open'} mt-2 w-full`} open={true}>
        <div className="btn m-1 hidden"></div>
        <ul tabIndex={0} className={`menu dropdown-content bg-base-100 rounded-box z-[100] w-52 p-2 dropdown-open shadow`}>
          <li><a>Feature under development</a></li>
        </ul>
      </div>
      <p
        className={`sticky text-white text-left left-0 text-sm mt-3 py-2 px-3 mb-2 w-fit pt-0 border-b-gray-600 border-solid border-b-2`}
        aria-label="My Chats"
        defaultChecked
      >My Chats</p>  
    </>
  )
}

export default SearchInput