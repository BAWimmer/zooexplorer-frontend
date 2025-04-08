"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const passwordValue = watch("password", "");

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    if (strength === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Moderate";
    if (strength === 3) return "Strong";
    if (strength === 4) return "Very Strong";
  };

  const onSubmit = (data) => {
    // In a real app, send data to your API for sign up
    router.push("/home");
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

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
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
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-black"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
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
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-black"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
          {passwordValue && (
            <p className="mt-1 text-sm text-black">
              Password strength:{" "}
              <span className="font-semibold text-black">
                {getPasswordStrength(passwordValue)}
              </span>
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Password does not match",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-black"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition-colors duration-300"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-green-600 hover:underline font-medium"
          >
            Sign In
          </a>
        </p>
      </form>
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
