import { Modal } from '../Modal/Modal'
import { Exercise } from '../../types'
import { Button } from '../Button/Button'
import { ProgressInput } from './ProgressInput'
import { FC, useEffect, useState } from 'react'
import {
  ExercisePayload,
  useSetWorkoutStatusMutation,
  useUpdateUserExerciseProgressMutation,
  WorkoutArg,
  WorkoutStatusArg,
} from '../../api/users.api'

import styles from './style.module.css'
import { useAppSelector } from '../../hooks/appHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { useMutationWithRefreshToken } from '../../hooks/authHooks'

type ProgressModalProps = {
  setIsOpened: Function
  workoutArg: WorkoutArg
  exercises?: Exercise[]
  onClick?: VoidFunction
}

type Form = {
  exercises?: Exercise[]
}

export const ProgressModal: FC<ProgressModalProps> = ({
  setIsOpened,
  workoutArg,
  exercises,
  onClick,
}) => {
  const user = useAppSelector(selectCurrentUser)
  const [form, setForm] = useState<Form>({ exercises: [] })
  const [updateProgress] = useUpdateUserExerciseProgressMutation()
  const [setWorkoutStatus] = useSetWorkoutStatusMutation()
  const handleMutationWithRefreshToken = useMutationWithRefreshToken()

  useEffect(() => {
    setForm({ exercises })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newExercises: Exercise[] = [...(form.exercises || [])]
    newExercises[index].userProgress = Math.max(
      0,
      Math.min(Number(e.target.value), newExercises[index].retriesCount)
    )
    setForm({ exercises: newExercises })
  }

  const handleSubmit = () => {
    let workoutStatus = true
    if (form.exercises) {
      form.exercises.forEach((item: Exercise, index: number) => {
        // проверяем, выполнены ли упражнения
        workoutStatus &&= item.userProgress === item.retriesCount

        const updateData: ExercisePayload = {
          arg: {
            ...workoutArg,
            exerciseId: index,
            idToken: user.idToken
          },
          body: {
            userProgress: item.userProgress || 0,
          },
        }
        handleMutationWithRefreshToken((idToken: string) => updateProgress({
          ...updateData,
          arg: { ...updateData.arg, idToken }
        }))
      })
      const workoutStatusArg: WorkoutStatusArg = {
        ...workoutArg,
        done: workoutStatus,
        idToken: user.idToken
      }
      handleMutationWithRefreshToken((idToken: string) => setWorkoutStatus({
        ...workoutStatusArg,
        idToken
      }))
    }
    if (onClick) onClick()
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation()
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Modal isOpen={() => setIsOpened(false)}>
      <div className={styles.content} onKeyDown={handleKeydown}>
        <h2 className={styles.title}>Мой прогресс</h2>
        <div className={styles.fields}>
          {form.exercises?.map((exercise: Exercise, index: number) => (
            <ProgressInput
              id={exercise.id}
              key={exercise.id}
              name={exercise.name}
              value={exercise?.userProgress || ''}
              amount={exercise.retriesCount}
              onChange={(e) => handleInput(e, index)}
            />
          ))}
        </div>
        <Button onClick={handleSubmit}>Отправить</Button>
      </div>
    </Modal>
  )
}
