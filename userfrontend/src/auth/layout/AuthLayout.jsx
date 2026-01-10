export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4">
      <div className="w-full max-w-[430px] py-10">
        {children}
      </div>
    </div>
  );
}
