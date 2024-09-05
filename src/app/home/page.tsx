"use client"
import React from "react"
import Image from "next/image"
import Button from "../components/Button"
import BottomBar from "../components/BottomBar"
import Link from "next/link"

export default function AxieHome() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-axie from-[#4bd4fe] to-[#80d458] bg-cover bg-no-repeat">
      {/* background img */}
      {/* <Image
        alt=""
        src={'/Axie_Main_BG3.jpg'}
        draggable={false}
        fill
        className="object-cover object-left-top"
        unoptimized
      /> */}

      {/* main content */}
      <div className="absolute flex w-full flex-col items-center justify-center self-center pb-24">
        {/* axie logo */}
        <Image
          alt=""
          height={300}
          width={300}
          className="md:w-90 w-72"
          src={"/Axie_Logo.png"}
          draggable={false}
        />

        <div>
          <Image
            height={200}
            width={500}
            src={"/Axie_Title.png"}
            className="hidden md:block md:scale-150"
          />
          <Image
            height={100}
            width={200}
            src={"/Axie_Title_Mobile.png"}
            className="block md:hidden"
          />
        </div>
        {/* buttons */}
        <div className="flex aspect-video w-80 flex-col items-center gap-2 rounded-xl border-4 border-white bg-white/75 p-2 text-center text-black md:w-[30rem] md:p-6">
          <p className="text-2xl font-bold">
            Meet your Axie Companion with MetaPals!
          </p>
          <p className="pb-2 font-medium md:px-4">
            Sign up for a chance to be an early adopter of the Axie digital
            companion!
          </p>
          <Button link="/form">
            <p className="px-4 py-1 text-lg font-bold">Be an Early Adopter</p>
          </Button>
          <p className="pt-2 text-sm md:text-base">
            Curious about the Axie digital companion?
          </p>
          <Link href={"https://discord.gg/metapals"}>
            <p className="text-sm font-semibold text-[#5339D6] underline">
              Find Out More!
            </p>
          </Link>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}
