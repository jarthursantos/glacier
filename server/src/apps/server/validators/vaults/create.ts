import * as Yup from 'yup'

export const CreateVaultValidator = Yup.object().shape({
  name: Yup.string()
    .typeError('name must be a string')
    .required('name is required')
})
