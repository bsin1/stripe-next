'use client'

interface Props {
  disabled: boolean
  primaryColor?: string
  title: string
  type?: 'submit'
  onClick?: () => void
}

export const PrimaryButton = ({
  disabled,
  primaryColor,
  title,
  type,
  onClick,
}: Props) => {
  return (
    <button
      className={`rounded-md border bg-black p-2 text-white hover:bg-gray-800 active:bg-gray-500 disabled:bg-disabled disabled:text-black disabled:hover:bg-disabled`}
      disabled={disabled}
      type={type}
      onClick={onClick}
      style={primaryColor ? { backgroundColor: primaryColor } : undefined}
    >
      {title}
    </button>
  )
}
