import { useState } from 'react'
import {
  HiOutlineTrash,
  HiOutlinePencil

} from 'react-icons/hi'
import Swal from 'sweetalert2'

import {
  // useGetCategoryByIdQuery,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} from '../../store/service/category/categoryService'

const EditCategory = () => {
  const { data } = useGetAllCategoriesQuery()
  const [createCategory] = useCreateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const categories = data?.data
  const [categoryEdit, setCategoryEdit] = useState(null)

  const handleSubmit = (e) => {
    if (categoryEdit.id == null) {
      e.preventDefault()
      const newCategory = { ...categoryEdit }
      createCategory({ ...newCategory })
    } else {
      updateCategory({ ...categoryEdit })
    }
  }

  return (
    <section className='flex flex-row justify-center my-4 px-2 drop-shadow-xl text-xs md:text-lg'>
      <section className='flex flex-col h-full px-3 py-4 bg-white  rounded-md w-full lg:w-1/2 dark:text-white-variant dark:bg-black'>
        <h2 className='font-bold text-center text-2xl mb-4'>
          Admin Categories
        </h2>

        <div className='flex flex-row h-1/2 w-full justify-center'>
          <table className='border w-full shadow-xl'>
            <thead>
              <tr className='bg-primary '>
                <th className='border'>Id</th>
                <th className='border'>Name</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {categories?.map((category, key) => {
                return (
                  <tr
                    onClick={() => setCategoryEdit({ ...category })}
                    key={key}
                    className='hover:bg-gray-variant hover:bg-opacity-50 cursor-pointer text-center border'
                  >
                    <td className='border text-center'>{category.id}</td>
                    <td className='border text-center'>{category.name}</td>
                    <td>
                      <button>
                        <HiOutlinePencil className='w-4 h-4 md:w-6 md:h-6 hover:text-green-600 m-1' />
                      </button>
                      <button onClick={() => {
                        deleteCategory(category.id),
                          Swal.fire({
                            target: 'main',
                            position: 'center',
                            width: '30rem',
                            heightAuto: false,
                            icon: 'success',
                            iconColor: '#fefefe',
                            backdrop: true,
                            background: '#DE76B5',
                            color: '#fefefe',
                            title: 'Category has been eliminated',
                            showConfirmButton: false,
                            timer: 1200
                          })
                      }}>
                        <HiOutlineTrash className='w-4 h-4 md:w-6 md:h-6 hover:text-red-600 m-1'
                        />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {console.log(categoryEdit)}
          </table>

          <div className='w-full flex flex-col px-3'>
            <form className='mb-4 w-full' onSubmit={handleSubmit}>
              <label className='block font-bold mb-4'>Id</label>
              <input
                type='text'
                id='id'
                placeholder={categoryEdit ? categoryEdit.id : null}
                className='border-2 w-full p-2 rounded-md placeholder-gray shadow-md dark:bg-black-variant'
                disabled
              />
              <label className='block font-bold mb-4 py-2'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Category name'
                value={categoryEdit ? categoryEdit.name : null}
                onChange={(e) =>
                  setCategoryEdit({ ...categoryEdit, name: e.target.value })}
                className='border-2 w-full p-2 rounded-md placeholder-gray shadow-md dark:bg-black-variant'
              />
              <section className='py-8'>
                <button
                  type='submit'
                  onClick={() => {
                    Swal.fire({
                      target: 'main',
                      position: 'center',
                      width: '30rem',
                      heightAuto: false,
                      icon: 'success',
                      iconColor: '#fefefe',
                      backdrop: true,
                      background: '#DE76B5',
                      color: '#fefefe',
                      title: 'Category has been created',
                      showConfirmButton: false,
                      timer: 1200
                    })
                  }}
                  className='w-full text-center mt-2 py-2 border rounded-md bg-primary text-white shadow-md dark:bg-gray-variant dark:hover:bg-primary hover:scale-105'
                >
                  Confirm
                </button>
              </section>
            </form>
          </div>
        </div>

        {/* <div className='flex-col md:flex-row justify-between hidden'>
          <div className='my-3'>
            <h2 className='text-xl font-bold text-center'>Admin subcategory</h2>
            <div className='flex flex-row w-full justify-evenly'>
              <table className='border w-1/2'>
                <tr className='bg-primary'>
                  <th className='border'>Id</th>
                  <th className='border'>Subcategory</th>
                </tr>
                <tr className='hover:bg-gray-variant hover:bg-opacity-50'>
                  <td className='border'>1</td>
                  <td className='border'>Pants</td>
                </tr>
                <tr className='hover:bg-gray-variant hover:bg-opacity-50'>
                  <td className='border'>2</td>
                  <td className='border'>Dress</td>
                </tr>
              </table>

              <section className='mb-4 w-1/3'>
                <label className='block font-bold mb-4'>Id</label>
                <input
                  type='text'
                  id='productName'
                  placeholder='
              #'
                  className='border-2 w-full p-2 rounded-md placeholder-gray shadow-md'
                  disabled
                />
                <label className='block font-bold mb-4'>Category</label>
                <input
                  type='text'
                  id='productName'
                  placeholder='Category'
                  className='border-2 w-full p-2 rounded-md placeholder-gray shadow-md'
                />
                <label className='block font-bold mb-4'>Name</label>
                <input
                  type='text'
                  id='productName'
                  placeholder='Name'
                  className='border-2 w-full p-2 rounded-md placeholder-gray shadow-md'
                />
                <button
                  className='w-full text-center mt-2 py-2 border rounded bg-primary text-white'
                >
                  Confirm
                </button>
              </section>
            </div>
          </div>
          <div className='flex flex-row justify-end items-end  gap-3'>
            <button className='md:h-1/6 border border-black rounded p-2 hover:bg-black hover:text-white'>
              Cancel
            </button>
            <button className=' md:h-1/6 bg-primary rounded p-2 hover:opacity-70 text-white'>
              Save
            </button>
          </div>
        </div> */}
      </section>
    </section>
  )
}

export default EditCategory
