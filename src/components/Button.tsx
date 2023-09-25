import { FC } from 'react'
import { classNames } from '@/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  variant?: 'gradient' | 'solid' | 'text' | ''
  width?: 'fit-parent' | 'fit-content'
  isLoading?: boolean
  icon?: JSX.Element | null
  iconPosition?: 'start' | 'end'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Button: FC<ButtonProps> = ({
  text,
  variant = 'gradient',
  width = 'fit-content',
  className,
  isLoading = false,
  icon,
  iconPosition = 'start',
  size = 'lg'
}) => {
  const widthClass = width === 'fit-content' ? 'w-fit' : 'w-full'

  const sizeClass = classNames(
    size === 'xs' ? 'px-1 py-1 rounded-full' : '',
    size === 'sm' ? 'px-2.5 py-1.5 rounded-full text-sm' : '',
    size === 'md' ? 'px-2.5 py-1.5 rounded-full' : '',
    size === 'lg' ? 'px-2.5 py-3 rounded-full' : '',
    size === 'xl' ? 'px-6 py-4 rounded-full' : ''
  )

  const backgroundClass = classNames(
    variant === 'gradient' ? 'text-white border border-transparent hover:border hover:border-[#40a9ff]' : '',
    variant === 'solid'
      ? 'text-white bg-[#36393F] border border-gray-600 hover:border-neon-100 active:bg-gray-800 active:border-gray-800 disabled:bg-gray-600 disabled:text-gray-50'
      : '',
    variant === 'text'
      ? classNames('text-white font-medium font-base')
      : ''
  )

  return (
    <button
      className={classNames(
        'flex items-center justify-center font-medium h-fit cursor-pointer transition-all duration-100',
        widthClass,
        sizeClass,
        backgroundClass,
        !isLoading ? variant:'bg-[#1c1f22] border-none',
        className!
      )}
      type='submit'
    >
      {iconPosition === 'start' && icon}
      {text}
      {iconPosition === 'end' && icon}
    </button>
  )
}

export default Button
