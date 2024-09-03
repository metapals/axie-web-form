import { forwardRef, ReactNode } from "react"
import Link from "next/link"

interface IButton {
  children?: ReactNode
  onClick?: () => any
  disabled?: boolean
  link?: string
  externalLink?: string
  theme?: "blue" | "white" | "orange" | "gray" | "green"
}

const colorSchemes = {
  blue: "bg-[#65C8FF] border-[#49adec] text-white",
  white: "bg-[#fcf9f9] border-[#cccccc] text-gray-400",
  orange: "bg-[#F7992A] border-[#E98610] text-white",
  gray: "bg-[#C0C0C0] border-[#B2B4B5] text-white",
  green: "bg-[#EAFFD4] border-[#B8E489] text-[#7EBA3D]",
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    { children, onClick, disabled, externalLink, link, theme, ...rest },
    ref,
  ) => {
    const color = theme ?? "blue"

    if (link) {
      return (
        <Link href={link}>
          <MTPButton
            onClick={onClick}
            disabled={disabled}
            ref={ref}
            theme={color}
            {...rest}
          >
            {children}
          </MTPButton>
        </Link>
      )
    }
    if (externalLink) {
      return (
        <Link href={externalLink} target={"_blank"} rel={"noopener noreferrer"}>
          <MTPButton
            onClick={onClick}
            disabled={disabled}
            ref={ref}
            theme={color}
            {...rest}
          >
            {children}
          </MTPButton>
        </Link>
      )
    }
    return (
      <MTPButton
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        theme={color}
        {...rest}
      >
        {children}
      </MTPButton>
    )
  },
)

Button.displayName = "Button"

export default Button

const MTPButton = forwardRef<HTMLButtonElement, IButton>((props, ref) => {
  return (
    <button
      type={"button"}
      className={`${colorSchemes[props.theme!]} group font-uniform_rounded relative rounded-2xl border-[6px] duration-300 hover:scale-105 hover:drop-shadow-xl disabled:pointer-events-none disabled:border-[#cccccc] disabled:bg-[#fcf9f9] disabled:text-gray-400 lg:rounded-3xl lg:border-[9px]`}
      ref={ref}
      {...props}
    >
      {props.children}

      {/*shine*/}
      <div
        className={
          "absolute left-[2%] top-[10%] aspect-[3/2] w-[7%] -rotate-[45deg] rounded-[50%] bg-white opacity-40"
        }
      />
    </button>
  )
})
MTPButton.displayName = "Button"
