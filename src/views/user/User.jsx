import { useState } from 'react'
import Address from './Address'
import Profile from './Profile'
import Orders from './Orders'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const User = () => {
  const [screen, setScreen] = useState('profile')
  const MySwal = withReactContent(Swal)

  const handleScreen = (screen) => {
    setScreen(screen)
  }

  const handleDelete = () => {
    MySwal.fire({
      target: 'main',
      position: 'center',
      width: '30rem',
      heightAuto: false,
      icon: 'warning',
      iconColor: '#fefefe',
      backdrop: true,
      background: '#DE76B5',
      color: '#fefefe',
      title: 'Are you sure?',
      text: 'You will not be able to recover this account!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire(
          'Deleted!',
          'Your account has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <>
      <section className='w-full flex gap-2 px-2 py-2'>
        <button
          className={`w-full text-black border-b-2 ${
            screen === 'profile' ? 'border-primary' : 'border-gray-200'
          }`}
          onClick={() => handleScreen('profile')}
        >
          <p className='w-full font-bold text-xl px-1 py-2 dark:text-white-variant'> Profile</p>
        </button>

        <button
          className={`w-full text-black border-b-2 ${
            screen === 'address' ? 'border-primary' : 'border-gray-200'
          }`}
          onClick={() => handleScreen('address')}
        >
          <p className='w-full font-bold text-xl px-1 py-2 dark:text-white-variant'>Address</p>
        </button>

        <button
          className={`w-full text-black border-b-2 ${
            screen === 'orders' ? 'border-primary' : 'border-gray-200'
          }`}
          onClick={() => handleScreen('orders')}
        >
          <p className='w-full font-bold text-xl px-1 py-2 dark:text-white-variant'> Orders</p>
        </button>
      </section>

      {screen === 'profile' && <Profile />}

      {screen === 'orders' && <Orders />}

      {screen === 'address' && <Address />}

      <section className='w-full max-w-6xl mx-auto space-y-3 p-3'>
        <h2 className='text-start font-bold text-3xl'>Danger Zone</h2>
        <div className='flex flex-col md:flex-row w-full gap-2 justify-between border-2 rounded-sm border-red-500 p-4'>
          <div className=''>
            <h2 className='font-semibold text-xl'>Delete this account</h2>
            <p className='text-md'>Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <button className='px-3 py-2 bg-primary rounded-md' onClick={handleDelete}>
            <p className='text-white font-semibold'>Delete Account</p>
          </button>

        </div>

      </section>
    </>
  )
}

export default User
