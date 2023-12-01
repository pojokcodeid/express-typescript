import type UserType from '../types/user.type'
import joi from 'joi'

export const inputUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi.object({
    user_id: joi.string().trim().allow(null, ''),
    email: joi.string().trim().required().email().messages({
      'string.base': 'Email harus berupa string',
      'string.empty': 'Email tidak boleh kosong',
      'string.email': 'Email tidak valid',
      'any.required': 'Email harus diisi'
    }),
    nama: joi.string().trim().required().messages({
      'string.base': 'Nama harus berupa string',
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama harus diisi'
    }),
    password: joi.string().min(3).max(15).required().messages({
      'string.base': 'Password harus berupa string',
      'string.empty': 'Password tidak boleh kosong',
      'string.min': 'Password minimal 3 karakter',
      'string.max': 'Password maksimal 15 karakter',
      'any.required': 'Password harus diisi'
    }),
    confirmPassword: joi
      .any()
      .equal(joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({
        'any.only': '{{#label}} tidak sama dengan password',
        'any.required': '{{#label}} harus diisi'
      }),
    role: joi.string().trim().allow(null, '')
  })
  return schema.validate(payload)
}

export const loginUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi.object({
    email: joi.string().trim().required().email().messages({
      'string.base': 'Email harus berupa string',
      'string.empty': 'Email tidak boleh kosong',
      'string.email': 'Email tidak valid',
      'any.required': 'Email harus diisi'
    }),
    password: joi.string().required().messages({
      'string.base': 'Password harus berupa string',
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password harus diisi'
    })
  })
  return schema.validate(payload)
}
