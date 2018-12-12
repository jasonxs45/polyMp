export function mc(uid) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > .5) {
        resolve(true)
      } else {
        reject(false)
      }
    }, 1000)
  })
}