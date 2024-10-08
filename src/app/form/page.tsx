"use client"

import React from "react"
import Image from "next/image"
import BottomBar from "../components/BottomBar"
import Button from "../components/Button"
import { FaXTwitter, FaDiscord, FaArrowLeftLong } from "react-icons/fa6"
import Link from "next/link"
import z from "zod"
import { useState } from "react"
import { AxieSendForm } from "../components/api/AxieSendForm"
import { useRouter } from "next/navigation"
import { URL_DISCORD, URL_TWITTER } from "../urls"

interface inputChangeType {
  target: { name: string; value: string }
}

// definition of validation requirement
const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name is too short")
    .min(1, "Required field for submission."),
  email: z
    .string()
    .min(6, "Email is too short")
    .email("Please provide a valid email")
    .min(1, "Required field for submission."),
  roninWalletAddress: z.string().min(1, "Required field for submission"),
})

export default function AxieForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    roninWalletAddress: "",
    xUsername: "",
    discordUsername: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    roninWalletAddress: "",
    xUsername: "",
    discordUsername: "",
    server: "",
  })

  // update state with user input
  const handleInputChange = (event: inputChangeType) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // send data to POST request
  const handleSubmit = async () => {
    setErrors({
      name: "",
      email: "",
      roninWalletAddress: "",
      xUsername: "",
      discordUsername: "",
      server: "",
    })

    try {
      console.log("AXIE FORM", form)
      formSchema.parse(form)
      const response = await AxieSendForm({
        name: form.name,
        email: form.email,
        roninWalletAddress: form.roninWalletAddress,
        xUsername: form.xUsername,
        discordUsername: form.discordUsername,
      })
      console.log(response)
      if (response.errors) {
        console.log("error message", response.errors)
        setErrors((prevErrors) => ({
          ...prevErrors,
          server: response.errors.message,
        }))
      }
      if (response.uid) {
        router.push("/notice")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((item) => {
          if (item.path[0] === "name") {
            setErrors((prevErrors) => ({ ...prevErrors, name: item.message }))
          }
          if (item.path[0] === "email") {
            setErrors((prevErrors) => ({ ...prevErrors, email: item.message }))
          }
          if (item.path[0] === "roninWalletAddress") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              roninWalletAddress: item.message,
            }))
          }
        })
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: "Something went wrong, please try again",
      }))
    }
  }

  return (
    <div className="absolute inset-0 flex overflow-y-scroll bg-mobile_plain from-[#4bd4fe] to-[#80d458] bg-cover bg-center bg-no-repeat md:overflow-clip md:bg-main_plain">
      {/* main content */}
      <div className="relative flex h-fit w-full flex-col items-center justify-center px-10 md:h-full md:pb-[5dvh]">
        <div className="flex flex-col gap-10 self-center md:flex-row md:p-12">
          {/* main title */}
          <div className="relative flex flex-col px-4 text-center md:w-1/2 md:px-10 md:text-left">
            {/* back arrow */}
            <Image
              alt="axie tripp"
              width={500}
              height={500}
              src={"/Axie_Tripp.webp"}
              className="absolute -bottom-40 left-40 hidden size-64 object-contain -scale-x-100 md:block 2xl:-bottom-64 2xl:left-40 2xl:size-96"
            />
            <Link
              href={"/"}
              className="absolute left-5 top-5 z-10 cursor-pointer duration-500 hover:scale-110 md:relative md:left-0 md:top-0"
            >
              <FaArrowLeftLong className="size-8 md:size-12" />
            </Link>
            <h1 className="pb-8 pt-10 text-4xl font-bold">
              Get Early Access to Axie Pals!
            </h1>
            <p>
              Browse the internet while your axies keep you company on-screen!
              Sign-up to MetaPals for a chance to get early access.
            </p>
            <br />
            <p className="text-sm font-semibold">
              *Selected users will be notified by email.
            </p>
            <br />

            {/* socials */}
            <div className="hidden h-fit w-full flex-row gap-4 pt-6 md:flex">
              <Link target="_blank" href={URL_DISCORD}>
                <FaDiscord size={24} />
              </Link>
              <Link target="_blank" href={URL_TWITTER}>
                <FaXTwitter size={20} />
              </Link>
            </div>
          </div>

          {/* form submission */}
          <form className="flex h-fit w-full flex-col gap-6 rounded-xl bg-white p-6 text-black md:mt-10 md:w-1/2">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-col md:w-1/2">
                {/* Name Field */}
                <input
                  onChange={(e) =>
                    handleInputChange({
                      target: { name: "name", value: e.target.value },
                    })
                  }
                  placeholder="Name*"
                  value={form.name}
                  type="text"
                  className="w-full rounded-sm border-b-2 border-b-gray-300 p-2"
                />
                <p className={`h-2 text-center text-sm text-red-400`}>
                  {errors.name && errors.name}
                </p>
              </div>

              {/* Email Field */}
              <div className="flex flex-col md:w-1/2">
                <input
                  onChange={(e) =>
                    handleInputChange({
                      target: { name: "email", value: e.target.value },
                    })
                  }
                  value={form.email}
                  placeholder="Email*"
                  type="email"
                  className="w-full rounded-sm border-b-2 border-b-gray-300 p-2"
                />
                <p className={`h-2 text-center text-sm text-red-400`}>
                  {errors.email && errors.email}
                </p>
              </div>
            </div>

            {/* Ronin Wallet Field */}
            <div className="flex w-full flex-col">
              <input
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "roninWalletAddress",
                      value: e.target.value,
                    },
                  })
                }
                value={form.roninWalletAddress}
                placeholder="Ronin Wallet Address*"
                type="text"
                className="w-full rounded-sm border-b-2 border-b-gray-300 p-2"
              />
              <p className={`h-2 text-center text-sm text-red-400`}>
                {errors.roninWalletAddress && errors.roninWalletAddress}
              </p>
            </div>

            {/* Discord Field */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-col md:w-1/2">
                <input
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "discordUsername",
                        value: e.target.value,
                      },
                    })
                  }
                  value={form.discordUsername}
                  placeholder="Discord Username"
                  type="text"
                  className="w-full rounded-sm border-b-2 border-b-gray-300 p-2"
                />
                <p className={`h-2 text-center text-sm text-red-400`}>
                  {errors.discordUsername && errors.discordUsername}
                </p>
              </div>

              {/* X Field */}
              <div className="flex flex-col md:w-1/2">
                <input
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "xUsername",
                        value: e.target.value,
                      },
                    })
                  }
                  value={form.xUsername}
                  placeholder="X Username"
                  type="text"
                  className="w-full rounded-sm border-b-2 border-b-gray-300 p-2"
                />
                <p className={`h-2 text-center text-sm text-red-400`}>
                  {errors.xUsername && errors.xUsername}
                </p>
              </div>
            </div>

            {/* submit button */}
            <div className="flex w-full flex-col justify-center pt-4 md:w-fit md:justify-start">
              <Button theme="axie_purple" onClick={() => handleSubmit()}>
                <p className="px-6 py-1 font-bold">Submit</p>
              </Button>
              <p className={`h-4 text-center text-red-400`}>
                {errors.server && "Error! " + errors.server}
              </p>
            </div>
            <div></div>
          </form>
        </div>

        {/* socials */}
        <div className="flex h-fit w-full flex-col items-center">
          <div className="flex h-fit w-full flex-row justify-center gap-4 py-10 md:hidden md:pb-0">
            <Link target="_blank" href={URL_DISCORD}>
              <FaDiscord size={24} />
            </Link>
            <Link target="_blank" href={URL_TWITTER}>
              <FaXTwitter size={20} />
            </Link>
          </div>
          <Image
            alt="axie tripp"
            width={500}
            height={500}
            src={"/Axie_Tripp.webp"}
            className="block size-64 object-contain -scale-x-100 md:hidden"
          />
        </div>
      </div>
      {/* <BottomBar /> */}
    </div>
  )
}
