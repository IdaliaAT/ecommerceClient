import Input from './Input'

const Form = ({ inputs, handleChange, handleSubmit, formError }) => {
  return (
    <form
      className="flex flex-col justify-center items-center shadow-lg px-3 py-4 bg-white border rounded-md w-full md:w-1/2 lg:w-1/3"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-center text-2xl mb-4">Sign In</h2>

      {/* If error shows alert */}
      {formError && (
        <p className="bg-red-800 border-r-4 border-black p-4 mb-4 text-white">
          <strong className="font-bold">Error!</strong>
          <span className="block">Please fill all the fields to sign in</span>
        </p>
      )}

      {inputs.map((input, index) => {
        return (
          <Input
            input={input}
            key={index}
            index={index}
            handleChange={handleChange}
          />
        )
      })}
    </form>
  )
}

export default Form
