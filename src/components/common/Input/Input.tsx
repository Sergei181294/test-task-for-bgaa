import type { FC } from "react"

interface InputProps {
       id?: string;
       value: string | number;
       type?: string;
       className?: string;
       onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
       inputRef?: any;
}

export const Input: FC<InputProps> = ({ id, value, type, className, onChange, inputRef }) =>
       <input
              type={type}
              className={className}
              id={id}
              value={value}
              onChange={onChange}
              ref={inputRef}
       />