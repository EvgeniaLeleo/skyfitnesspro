import { FC } from 'react'
import { useAppSelector } from '../../hooks/appHooks'
import { selectSpinner } from '../../slices/spinnerSlice'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Modal } from '../Modal/Modal'

type SpinnerModalProps = {
  setIsOpened?: Function
}

export const SpinnerModal: FC<SpinnerModalProps> = ({ setIsOpened = () => {} }) => {
  const isVisible = useAppSelector(selectSpinner)

  return (
    <>
      { isVisible &&
      <Modal isOpen={setIsOpened}>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress thickness={8} size="4rem" />
        </Box>
      </Modal>
      }  
    </>
  )
}