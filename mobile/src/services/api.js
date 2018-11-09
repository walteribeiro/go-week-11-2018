import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.3.2:3000'
})

/**
 * IOS: localhost ou IP da maquina
 *
 * Android:
 * - Android Studio => 10.0.2.2
 * - Genymotion => 10.0.3.2
 */

export default api
