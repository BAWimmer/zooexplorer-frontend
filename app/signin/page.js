"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
  
      if (result.error) {
        alert(result.error);
      } else {
        router.push('/home');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('An error occurred during sign in');
    }
  };

  return (  
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform hover:scale-105 transition-transform duration-300"
      >
        {/* Logo and Application Name */}
        <div className="flex flex-col items-center mb-4">
          <img src="/images/logo.jpg" alt="App Logo" className="h-16 w-auto" />
          <h1 className="text-black text-5xl font-bold mt-2 fadeInUp">
            Zoo ExplorerApp
          </h1>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors duration-300"
        >
          Sign In
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </form>
      {/* Add the fadeInUp animation style */}
      <style jsx>{`
        .fadeInUp {
          animation: fadeInUp 1.5s ease-in-out;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
