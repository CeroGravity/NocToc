import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

interface Inputs {
  email: string
  password: string
}

function Signup() {
  const [signup, setSignup] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (signup) {
      await signUp(data.email, data.password)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Sign Up - Noctoc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://i.postimg.cc/QdbqZyPG/vhscity.gif"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="/logo.svg"
        className="absolute left-4 top-4 cursor-pointer object-contain hover:animate-pulse md:left-10 md:top-6"
        width={150}
        height={150}
        onClick={() => router.push('/login')}

      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign Up</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${errors.email && 'border-b-2 border-orange-500'
                }`}
              {...register('email', { required: true })}
            />
            {errors.email && signup && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Password"
              className={`input ${errors.password && 'border-b-2 border-orange-500'
                }`}
            />
            {errors.password && signup && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#ec8200] py-3 font-semibold"
          onClick={() => setSignup(true)}
          type="submit"
        >
          Sign Up
        </button>
        <div className="text-[gray]">
          Already have an account?{' '}
          <button
            className="cursor-pointer text-white hover:underline"
            onClick={() => {
              router.push('/login')
            }}
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
