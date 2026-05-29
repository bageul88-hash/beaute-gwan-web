import { IconCheck } from '@tabler/icons-react'

interface CheckItemProps {
  label: string
  dark?: boolean
}

export default function CheckItem({ label, dark = false }: CheckItemProps) {
  return (
    <div className="flex items-center gap-3">
      <IconCheck size={16} color="#b8924a" aria-hidden="true" />
      <span className={`text-[14px] ${dark ? 'text-[#bbb]' : 'text-[#5a5547]'}`}>
        {label}
      </span>
    </div>
  )
}
