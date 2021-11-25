// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getToken } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCl4w6fM1JU96LFyEbTuF9_BjqkO3m9h9I',
  authDomain: 'kanban-board-14580.firebaseapp.com',
  projectId: 'kanban-board-14580',
  storageBucket: 'kanban-board-14580.appspot.com',
  messagingSenderId: '289377588272',
  appId: '1:289377588272:web:4ed99985b608b1bd4349f5'
}

initializeApp(firebaseConfig)

export const preguntarPermisos = async () => {
  try {
    // getMessaging()

    // await messaging.requestPermission()
    await Notification.requestPermission().then(async permission => {
      if (permission === 'denied') {
        console.log("Permission wasn't granted. Allow a retry.")
        return
      } else if (permission === 'default') {
        console.log('The permission request was dismissed.')
        return
      }
      const token = await getToken({ vapidKey: 'BOy67B00Sq6Rm-Tt8wRZQyTX0-p_gbEFileB9yR-yiQlT1jp6yUKo_uQi9lcQAk1hDMyCEJiNfvRZnAYaX1nD9c' })
      console.log('user token: ', token)

      return token
    })
  } catch (error) {
    console.error(error)
  }
}

// Initialize Firebase
// export const firebaseModule = initializeApp(firebaseConfig)
