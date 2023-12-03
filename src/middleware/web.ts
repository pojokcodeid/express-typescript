import express, { type Application } from 'express'

import appMiddleware from '.'

const web: Application = express()

web.use(appMiddleware)

export default web
