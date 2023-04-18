import React from 'react'
import { ResultCardProps } from './ResultCardProps.types'
import { currencyFormat } from '@/utils/currencyFormater'
import {BsInfoCircle} from 'react-icons/bs'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export const ResultCard = ({title,value, type = 'currency',suffix = '',tooltipId,tooltipMessage}:ResultCardProps) => {
  return (
    <div className="bg-secondary text-white rounded-lg shadow-md p-3 relative"

    >
      <BsInfoCircle className='absolute top-2 right-2' data-tooltip-id={tooltipId} data-tooltip-content={tooltipMessage}/>
      <Tooltip id={tooltipId} className='max-w-[300px]'/>
    <strong>{title}</strong>
    {type === 'currency' ? (
      <p className="text-xl font-bold">{currencyFormat(value)}</p>
    ) : (
      <p className="text-xl font-bold">{value ? value : 0}{suffix}</p>
    )}

  </div>  
  )
}
