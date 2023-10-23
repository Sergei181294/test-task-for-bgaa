import type { FC, PropsWithChildren } from "react";
import css from './styles.module.css';


interface ButtonProps {
       onClick?: any;
       disabled?: boolean;
       className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ onClick, disabled }) =>
       <button
              onClick={onClick}
              disabled={disabled}
       >
              Сохранить
       </button>