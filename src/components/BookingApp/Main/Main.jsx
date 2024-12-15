import LoginButton from "../Auth0/Login/Login";

const Main = () => {
  return (
    <div className="h-dvh bg-gray-50 overflow-auto flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col justify-center items-center">

        <div className="bg-white p-10 m-5 drop-shadow-xl rounded-xl">
          <h1 className="text-4xl font-bold mb-4">BookSuite</h1>
          <p className="text-lg text-gray-500">
            Create, track, and manage bookings, appointments, and reservations with ease.
          </p>

          <div className="mt-5">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Main;

