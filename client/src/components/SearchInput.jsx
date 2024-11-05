import { useState } from 'react';
import {IoSearchSharp} from 'react-icons/io5'
import { useGetConversation } from '../hooks/useGetConversation';
import toast from 'react-hot-toast';
import useConversation from '../hooks/useConversationStore';

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const {setSelectedConversation}=useConversation()
  const {userChatList}=useGetConversation()

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) 
      return;
    if (search.length < 3)
       toast.error("Please enter at least 3 search characters.");
    const result = userChatList.find(user => user.fullName.toLowerCase().includes(search.toLowerCase()))
    if (!result) 
      return toast.error("User not found");
    setSelectedConversation(result);
    setSearch("");
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
        <input type="text" className="grow input input-bordered rounded-full" placeholder="Search" 
         value={search}
         onChange={(e) =>setSearch(e.target.value)}
        />
        <button className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput