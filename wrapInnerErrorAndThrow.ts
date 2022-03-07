import { ErrorWithCause } from "./ErrorWithCause";
import { throwError } from './throwError'

export const wrapInnerErrorAndThrow = ()=>{
  try{
    throwError()
  }catch (error){
    throw new ErrorWithCause("Higher level error with cause.", error)
  }
}
