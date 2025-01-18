import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5'
import { useGetConversation } from '../hooks/useGetConversation';
import toast from 'react-hot-toast';
import useConversationStore from '../hooks/useConversationStore';

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversationStore()
  const { userChatList } = useGetConversation()
  const [searchList, setSearchList] = useState([])
  const [err, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("")
    if (!search)
      return;
    if (search.length < 1)
      return toast.error("Please enter at least 3 search characters.");
    const result = await fetch('/api/users/search/?query='+ search)
    const data = await result.json();
    if (data.error) {
      setError(data.error);
    } else {
      setSearchList(data)
    }
    setIsOpen(true);
    console.log(data)
    if (!result)
      toast.error("User not found");
    // setSelectedConversation(result);
    setSearch("");
  }
  const handleClick = (user) => {
    setSelectedConversation(user);
    setIsOpen(false);
    setTimeout(()=>setIsOpen(false),200)
  }

  return (
    <>
      <form className="flex items-center gap-2" onSubmit={handleSearch}>
        <input type="text" className="grow input input-bordered rounded-full" placeholder="Search"
          onBlur={()=>setTimeout(()=>setIsOpen(false),200)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
      <div className={`dropdown ${isOpen && 'dropdown-open'} mt-2 w-full`} open={true}>
        <div className="btn m-1 hidden"></div>
        <ul tabIndex={0} className={`menu dropdown-content bg-base-100 rounded-box z-[100] w-56 p-2 dropdown-open shadow`}>
          {err 
          ? <li className='left-0 text-left min-h-6 px-2'> {err && err}</li> 
          : searchList?.map( (user, i) => 
          <li key={user._id} className={`${i!==(searchList.length-1) && 'border-b-black border-b-[1px]'} w-full py-1`}>
            <a href="#" onClick={()=> handleClick(user)}>
              {user.fullName} <span className='text-sm opacity-50 p-0 m-0'>@{user.username}</span>
            </a>
          </li>
          )}
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