export type ContactFormData= {
  name: string
  email: string
  subject: string
  message: string
  type: "general" | "feedback" | "inquiry" | "other"
}

export const initialContactFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  type: "general",
}

export type ContactInfoType = {
  address: string
  phone: string
  email: string
  hours: string
}

export const initialContactInfo:ContactInfoType=
{
address:"",
email:"",
phone:"",
hours:""
}
export type OfficerType = {
  name: string
  title: string
  email: string
  phone: string
  responsibilities: string
}[]
export type FaqType = {
  question: string
  answer: string
}[]
