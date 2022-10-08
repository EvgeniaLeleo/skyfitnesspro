// TODO: нужны стили для сообщений о загрузке и ошибке
import { Link } from 'react-router-dom'

import styles from './style.module.css'

import { useEffect, useState } from 'react'
import { DataSnapshot, off, onValue } from 'firebase/database'
import { CourseMainData } from '../../types'
import { Card } from '../Card/Card'
import { coursesRef } from '../../db/refs'
import { getCourseList } from '../../db/service'

export const Gallery = () => {
  const [courses, setCourses ] = useState<CourseMainData[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  // что делаем с данными, полученными из БД
  const onDataChange = (items: DataSnapshot) => {
    if (items.exists()) {
      setCourses(getCourseList(items))
    } else {
      setError('Упс... Ошибка загрузки')
      console.error('Data not found')
    }
    setIsLoading(false)
  }
  
  useEffect(() => {
    // подписка на данные из БД
    onValue(coursesRef, onDataChange)
    
    return () => {
      // отключаем подписку на данные из БД
      off(coursesRef, 'value', onDataChange)
    }
  }, [])

  return (
    <div className={styles.gallery}>
      {courses && courses.map((item) => (
        <Link to={`/aboutcourse/${item.id}`} className={styles.link}>
          <Card item={item} key={item.id}></Card>
        </Link>
      ))}
      {isLoading && <h1 style={{ color: 'white' }}>Загрузка...</h1>}
      {error && <h1 style={{ color: 'white' }}>{error}</h1>}
    </div>
  )
}
