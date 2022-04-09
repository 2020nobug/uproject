import { post } from '@/utils/request'

export default {
  submit: query => post('/api/minio/submit', query)
}
