import LoginForm from './LoginForm';

function LoginPage() {
  return ( 
    <main className="min-h-screen flex items-center justify-center">
        <div className="w-[90%] lg:w-[55%] h-full flex flex-col gap-8 items-center justify-center">
        <LoginForm />
      </div>

    </main>
   );
}

export default LoginPage;