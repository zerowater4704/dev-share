'use client'
import { useState } from 'react'

export interface pagenateProps {
  pageNumbers: number[]
  pagenate: (pagenum: number) => void
  currentPage: number
}

const usePageNation = (perPageNum: number, array: UserAndProjectDataType[]) => {
  //データ（配列）の加工、分割 --------------------
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = perPageNum

  const lastIndex = currentPage * perPage //例：６
  const firstIndex = lastIndex - perPage //0
  const currentArray = array.slice(firstIndex, lastIndex) //分割されたページ

  //ページネーションのボタンの部分 --------------------
  const arrayLength = array.length
  const pageNumbers: number[] = [] //ボタン用の配列

  for (let i = 1; i <= Math.ceil(arrayLength / perPage); i++) {
    pageNumbers.push(i)
  }

  //onClick属性でページネート
  const pagenate = (pageNum: number) => setCurrentPage(pageNum)

  return { currentArray, pageNumbers, pagenate, currentPage }
}

export default usePageNation
