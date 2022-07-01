import React from 'react'
import { axiosGet } from './AxiosCustom'

export const TestRequest = () => {
    axiosGet('/getUserData')
}
