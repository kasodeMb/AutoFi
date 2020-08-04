
import supertest from 'supertest'

import app from '../src/app'

export const server = supertest(app)
export const BASE_URL = '/vehicles'
